namespace Domain.Entities.Characters;

public class CharacterDynamicProperties
{
    public int HitPoints { get; protected set; }

    public int TemporaryHitPoints { get; protected set; }

    public int HitDicesLeft { get; protected set; }

    public int ActualArmorClass { get; protected set; }

    public int InspirationBonus { get; protected set; }

    public int ActualSpeed { get; protected set; }

    public int DeathSavesSuccessCount { get; protected set; }

    public int DeathSavesFailureCount { get; protected set; }

    public bool IsDying { get; protected set; }

    public CharacterDynamicProperties(
        int initialHitPoints, 
        int initialHitPointDicesCount, 
        int baseArmorClass,
        int baseSpeed
    )
    {
        HitPoints = initialHitPoints;
        HitDicesLeft = initialHitPointDicesCount;
        ActualArmorClass = baseArmorClass;
        ActualSpeed = baseSpeed;
    }

    protected CharacterDynamicProperties() {}

    internal void TakeDamage(int damage, int maxPossibleCharacterHp, out bool isMomentalDeath) 
    {
        var tempHpDamage = Math.Min(damage, TemporaryHitPoints);
        TemporaryHitPoints -= tempHpDamage;

        var hpDamage = damage - tempHpDamage;
        HitPoints -= hpDamage;

        if (HitPoints <= 0) 
        {
            var overDamage = Math.Abs(HitPoints);
            isMomentalDeath = overDamage != 0 && overDamage > maxPossibleCharacterHp;
            if (isMomentalDeath) 
            {
                DeathSavesFailureCount = 3;
            }

            HitPoints = 0;
            IsDying = true;
        }
        else 
        {
            isMomentalDeath = false;
        }
    }

    internal void Resurrect()
    {
        TemporaryHitPoints = 0;
        HitPoints = 1;
        DeathSavesFailureCount = DeathSavesSuccessCount = 0;
        IsDying = false;
    }

    internal void Heal(int hp)
    {
        HitPoints += hp;
    }

    internal void SetInspirationBonus(int inspiration) 
    {
        ArgumentOutOfRangeException.ThrowIfLessThan(inspiration, 0, nameof(inspiration));
        InspirationBonus = inspiration;
    }

    internal void UseHitDice()
    {
        HitDicesLeft = Math.Max(0, HitDicesLeft - 1);
    }

    internal void SetActualSpeed(int speed) 
    {
        ArgumentOutOfRangeException.ThrowIfLessThanOrEqual(speed, 0, nameof(speed));
        ActualSpeed = speed;
    }

    internal void SetActualArmorClass(int armorClass) 
    {
        ArgumentOutOfRangeException.ThrowIfLessThan(armorClass, 0, nameof(armorClass));
        ActualArmorClass = armorClass;
    }

    internal void SetDeathSaves(int success, int failures, out bool characterHasBeenDead)
    {
        DeathSavesSuccessCount = success;
        DeathSavesFailureCount = failures;
        characterHasBeenDead = failures == 3;

        if (!characterHasBeenDead && success == 3)
            Resurrect();
    }

    internal void SetTemporaryHitPoints(int hp)
    {
        ArgumentOutOfRangeException.ThrowIfNegative(hp, nameof(hp));
        TemporaryHitPoints = hp;
    }
}
