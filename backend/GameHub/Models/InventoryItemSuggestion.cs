using Domain.Entities.Game.Items;

namespace GameHub.Models;

public class InventoryItemSuggestion
{
    public Item Item { get; set; }
    public ItemFromInventory? ItemFromInventory { get; set; }
}
