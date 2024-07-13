using Domain.Entities.Game.Items;
using Domain.Entities.Items;
using Domain.Entities.Items.Armors;
using Domain.Entities.Items.Weapons;

namespace Contracts.Inventory;

public record CreateInventoryItemDto
{
    public int Count { get; init; }

    public bool InUse { get; init; }

    /// <summary>
    /// If character can use this item and take proficiency bonus 
    /// </summary>
    public bool IsItemProficiencyOn { get; init; }

    public Weapon? Weapon { get; init; }

    public Armor? Armor { get; init; }

    public Stuff? Stuff { get; init; }

    public bool IsValidItemDescriptor() 
        => Weapon is not null && Armor is null && Stuff is null
        || Armor is not null && Weapon is null && Stuff is null
        || Stuff is not null && Weapon is null && Armor is null;

    public Item GetItem()
    {
        if (Weapon is not null)
            return Weapon;
        else if (Armor is not null)
            return Armor;
        else if (Stuff is not null)
            return Stuff;
        
        throw new ArgumentOutOfRangeException();
    }
}
