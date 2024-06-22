namespace Domain.Entities.Character;

public class CharacterAggregate
{
    public Guid Id { get; protected set; }

    public CharacterPersonality Personality { get; protected set; }

    public CharacterStats Stats { get; protected set; }

    public CharacterManagement Info { get; protected set; }

    public CharacterInventoryAggregate Inventory { get; protected set; }

    public CharacterDynamicProperties? InGameStats { get; protected set; }
}
