

namespace Domain.Entities.Character;

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

    internal void SetInspirationBonus(int inspiration) 
    {
        ArgumentOutOfRangeException.ThrowIfLessThan(inspiration, 0, nameof(inspiration));
        InspirationBonus = inspiration;
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

    internal void IncreaseOneOfDeathSavesCounters(bool isSuccessful, out bool characterHasBeenDead) 
    {
        characterHasBeenDead = false;

        if (isSuccessful) 
        {
            DeathSavesSuccessCount++;
        }
        else 
        {
            DeathSavesFailureCount++;
        }

        // stable health
        if (DeathSavesSuccessCount == 3) 
        {
            IsDying = false;
            ResetDeathSavesCounters();
        }
        else if (DeathSavesFailureCount == 3) 
        {
            characterHasBeenDead = true;
        }
    } 

    private void ResetDeathSavesCounters()
    {
        DeathSavesSuccessCount = DeathSavesFailureCount =0;
    }
}
