using Domain.Entities.Game.Items;
using Domain.Entities.Items;
using Domain.Entities.Items.Armors;
using Domain.Entities.Items.Weapons;

namespace Domain.Extensions;

public static class ItemExtensons 
{
    public static readonly string WeaponType = nameof(Weapon);

    public static readonly string ArmorType = nameof(Armor);

    public static readonly string StuffType = nameof(Stuff);

    public static bool IsArmor(this Item item) => item.ItemType == ArmorType;
}