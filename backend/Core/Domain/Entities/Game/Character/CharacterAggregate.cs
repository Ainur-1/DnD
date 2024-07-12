namespace Domain.Entities.Character;

public class CharacterAggregate
{
    public Guid Id { get; protected set; }

    public CharacterPersonality Personality { get; protected set; }

    public CharacterStats Stats { get; protected set; }

    public CharacterManagement Info { get; protected set; }

    public CharacterInventoryAggregate Inventory { get; protected set; }

    public CharacterDynamicProperties? InGameStats { get; protected set; }

    public void InitializeInGameStats()
    {
        var stats = new CharacterDynamicProperties()
        {
            HitPoints = Stats.HitPointsMaximum,
            TemporaryHitPoints = 0,
            HitDicesLeft = Stats.HitPointsDiceMaximumCount,
            ActualArmorClass = Stats.BaseArmorClass,
            InspirationBonus = 0,
            ActualSpeed = Stats.BaseSpeed,
            DeathSavesSuccessCount = 0,
            DeathSavesFailureCount = 0,
            IsDying = false
        };
        InGameStats = stats;
    }
}
