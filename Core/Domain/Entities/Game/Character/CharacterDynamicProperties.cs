namespace Domain.Entities.Character;

public class CharacterDynamicProperties
{
    public int HitPoints { get; set; }
    public int TemporaryHitPoints { get; set; }

    public int HitDicesLeft { get; set; }

    public int ActualArmorClass { get; set; }

    public int InspirationBonus { get; set; }

    public int InitiativeModifier { get; set; }

    public int ActualSpeed { get; set; }

    public int DeathSavesSuccessCount { get; set; }

    public int DeathSavesFailureCount { get; set; }
}
