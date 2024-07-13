using Domain.Entities.Game.Items;
using Domain.Extensions;

namespace Domain.Entities.Items;

public class Stuff : Item
{
    public override string ItemType => ItemExtensons.StuffType;
}
