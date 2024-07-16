using System.Diagnostics;
using Domain.Entities.Items.Armors;
using Domain.Exceptions;

namespace Domain.Entities.Characters;

public class Character : IEntity<Guid>
{
    public Guid Id { get; protected set; }

    public CharacterPersonality Personality { get; protected set; }

    public CharacterStats Stats { get; protected set; }

    public CharacterManagement Info { get; protected set; }

    public CharacterInventory Inventory { get; protected set; }

    public CharacterDynamicProperties? InGameStats { get; protected set; }

    public bool CanResurrect => Info.IsDead || InGameStats != null && !InGameStats.IsDying;

    public Character(
        CharacterPersonality setUpPersonality,
        CharacterStats setUpStats,
        CharacterManagement setUpInfo,
        CharacterInventory startInventory
    ) 
    {
        Id = Guid.NewGuid();

        ArgumentNullException.ThrowIfNull(setUpPersonality, nameof(setUpPersonality));
        ArgumentNullException.ThrowIfNull(setUpStats, nameof(setUpStats));
        ArgumentNullException.ThrowIfNull(setUpInfo, nameof(setUpInfo));
        ArgumentNullException.ThrowIfNull(startInventory, nameof(startInventory));

        Personality = setUpPersonality;
        Stats = setUpStats;
        Info = setUpInfo;
        Inventory = startInventory;
    }

    protected Character() {}

    public void TakeDamage(int damage)
    {
        if (damage < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(damage));
        }
        ThrowIfNotInGameStats();
        Debug.Assert(InGameStats != null, "Inconsistent character state!");

        InGameStats.TakeDamage(damage, Stats.HitPointsMaximum, out var isMomentalDeath);

        if (isMomentalDeath)
        {
            Die();
        }
    }

    public void Resurrect()
    {
        if (!CanResurrect)
        {
            return;
        }

        Info.IsDead = false;
        InGameStats?.Resurrect();
    }

    public void Heal(int hpAddition)
    {
        ThrowIfNotInGameStats();
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(hpAddition);
        ThrowIfIsDead();

        var possibleAddition = Math.Min(hpAddition, Stats.HitPointsMaximum - InGameStats!.HitPoints);
        
        if (InGameStats.IsDying)
        {
            InGameStats.Resurrect();
            // one hp is set up by default after Resurrection
            InGameStats.Heal(Math.Max(possibleAddition - 1, 0));
        } 
        else
        {
            InGameStats.Heal(possibleAddition);
        }
    }

    public void SetTempHp(int tempHp)
    {
        ThrowIfNotInGameStats();
        InGameStats!.SetTemporaryHitPoints(tempHp);
    }

    public void UseHitDice()
    {
        ThrowIfNotInGameStats();
        ThrowIfIsDead();

        if (InGameStats!.HitDicesLeft > 0)
            InGameStats!.UseHitDice();
    }

    public void UpdateDeathSaves(int success, int failures)
    {
        ValidateDeathSaves(success, nameof(success));
        ValidateDeathSaves(failures, nameof(failures));
        ThrowIfNotInGameStats();
        ThrowIfIsDead();

        InGameStats!.SetDeathSaves(success, failures, out var mustDie);

        if (mustDie)
        {
            Die();
        }
    }

    internal void JoinParty(Guid partyId)
    {
        if (partyId == default)
        {
            throw new ArgumentException("Party can not be empty.", nameof(partyId));
        }

        // initialize fields
        Info.JoinedPartyId = partyId;
        InGameStats = new CharacterDynamicProperties(
            initialHitPoints: Stats.HitPointsMaximum,
            initialHitPointDicesCount: Stats.HitPointsDiceMaximumCount,
            baseArmorClass: Stats.BaseArmorClass,
            baseSpeed: Stats.BaseSpeed
        );

        // adjust default values
        (var ac, var speed) = CalculateActualSpeedAndArmorAccordingInventory();
        InGameStats.SetActualArmorClass(ac);
        InGameStats.SetActualSpeed(speed);
    }

    private (int ActualArmor, int ActualSpeed) CalculateActualSpeedAndArmorAccordingInventory() 
    {
        var actualArmor = Stats.BaseArmorClass;
        var actualSpeed = Stats.BaseSpeed;
        var dexterityModifier = Stats.DexterityModifier;

        var armorOnCharacter = Inventory
            .Items
            .Where(x => x.InUse && x.Item is Armor)
            .Select(x => x.Item)
            .Cast<Armor>()
            .ToArray();
        
        var shield = armorOnCharacter
            .Where(x => x.ArmorType == ArmorType.Shield)
            .OrderByDescending(x => x.BaseArmorClass)
            .FirstOrDefault();
        
        var heaviestArmor = armorOnCharacter
            .Where(x => x.ArmorType != ArmorType.Shield)
            .OrderByDescending(x => (x.ArmorType, x.BaseArmorClass))
            .FirstOrDefault();

        if (shield is not null) 
        {
            actualArmor += shield.CalculateArmorClass(dexterityModifier);
        }

        if (heaviestArmor is not null) 
        {
            actualArmor += heaviestArmor.CalculateArmorClass(dexterityModifier);
            actualSpeed = Math.Max(
                actualSpeed - heaviestArmor.CalculateSpeedExpenses(Stats.StrengthAbility),
                0
            );
        }
        
        return (actualArmor, actualSpeed);
    }

    private void Die() 
    {
        Info.IsDead = true;
    }

    private void ThrowIfNotInGameStats()
    {
        if (InGameStats == null)
        {
            throw new InconsistentOperationException("Персонаж не в отряде.");
        }
    }

    private void ThrowIfIsDead()
    {
        if (Info.IsDead)
            throw new InconsistentOperationException("Персонаж мертв!");
    }

    private void ValidateDeathSaves(int deathSaves, string paramName)
    {
        ArgumentOutOfRangeException.ThrowIfNegative(deathSaves, paramName);
        ArgumentOutOfRangeException.ThrowIfGreaterThan(deathSaves, 3, paramName);
    }
}
