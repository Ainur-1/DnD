using Domain.Entities.Game.Items;
using Domain.Entities.Items.Armors;
using Domain.Entities.Items.Weapons;

namespace Contracts.Inventory;

public record OneOfItem
{
    public OneOfItem(Weapon weapon) => Weapon = weapon;
    public OneOfItem(Armor armor) => Armor = armor;
    public OneOfItem(Stuff stuff) => Stuff = stuff;

    public Stuff? Stuff { get; }

    public Armor? Armor { get; }

    public Weapon? Weapon { get; }
}
