using AutoMapper;
using Contracts.Inventory;
using Domain.Entities.Game.Items;
using Domain.Entities.Items.Armors;
using Domain.Entities.Items.Weapons;


namespace Mappings.Resolvers;

internal class OneOfItemResolver : IValueResolver<InventoryItem, InventoryItemDto, OneOfItem>
{
    public OneOfItem Resolve(InventoryItem inventoryItem, InventoryItemDto destination, OneOfItem destMember, ResolutionContext context)
    {
        var source = inventoryItem.Item;
        if (source is Stuff stuff)
        {
            return new OneOfItem(stuff);
        } 
        else if (source is Weapon weapon)
        {
            return new OneOfItem(weapon);
        } 
        else if (source is Armor armor) 
        {
            return new OneOfItem(armor);
        }


        throw new ArgumentOutOfRangeException("Mapping for OneOfItem was not registered.");
    }
}
