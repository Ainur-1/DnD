using System.Diagnostics;
using Domain.Entities.Items.Armors;
using Domain.Extensions;

namespace Domain.Entities.Character;

public class CharacterAggregate
{
    public Guid Id { get; protected set; }

    public CharacterPersonality Personality { get; protected set; }

    public CharacterStats Stats { get; protected set; }

    public CharacterManagement Info { get; protected set; }

    public CharacterInventoryAggregate Inventory { get; protected set; }

    public CharacterDynamicProperties? InGameStats { get; protected set; }

    public CharacterAggregate(
        CharacterPersonality setUpPersonality,
        CharacterStats setUpStats,
        CharacterManagement setUpInfo,
        CharacterInventoryAggregate startInventory
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

    protected CharacterAggregate() {}

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
            .Where(x => x.InUse && x.Item.IsArmor())
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

    public void TakeDamage(int damage) 
    {
        if (damage < 0) 
        {
            throw new ArgumentOutOfRangeException(nameof(damage));
        }
        else if (InGameStats == null && Info.JoinedPartyId == default) 
        {
            throw new InvalidOperationException("Could not complete operation since character is not initialized.");
        }

        Debug.Assert(InGameStats != null, "Inconsistent character state!");

        InGameStats.TakeDamage(damage, Stats.HitPointsMaximum, out var isMomentalDeath);

        if (isMomentalDeath) 
        {
            Die();
        }
    }

    private void Die() 
    {
        Info.IsDead = true;
    }
}
