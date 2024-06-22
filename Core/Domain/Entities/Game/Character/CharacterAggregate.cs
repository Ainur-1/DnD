namespace Domain.Entities.Character;

// This entity is not stored in db (if postgresql approach)
public class CharacterAggregate
{
    public CharacterPersonality Personality { get; protected set; }

    public CharacterStats Stats { get; protected set; }

    public CharacterManagement Info { get; protected set; }

    public CharacterInventoryAggregate Inventory { get; protected set; }

    //public CharacterDynamicProperties? InGameStats { get; protected set; }

    //todo: impllement character methods (Join party, Die, etc)
}
