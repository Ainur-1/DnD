using Domain.Entities.Game.Items;
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

    public Weapon? MaybeWeapon { get; init; }

    public Armor? MaybeArmor { get; init; }

    public Stuff? MaybeStuff { get; init; }

    public bool IsValidItemDescriptor() 
        => MaybeWeapon is not null && MaybeArmor is null && MaybeStuff is null
        || MaybeArmor is not null && MaybeWeapon is null && MaybeStuff is null
        || MaybeStuff is not null && MaybeWeapon is null && MaybeArmor is null;

    public Item GetItem()
    {
        if (MaybeWeapon is not null)
            return MaybeWeapon;
        else if (MaybeArmor is not null)
            return MaybeArmor;
        else if (MaybeStuff is not null)
            return MaybeStuff;
        
        throw new ArgumentOutOfRangeException();
    }
}
