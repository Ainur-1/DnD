using Service.Abstractions;
using Domain.Entities.Game.Items;


namespace Services.Implementation;

public class InventoryService : IInventoryService
{
    public Task AddItemAsync(Guid characterId, Item item)
    {
        throw new NotImplementedException();
    }

    public Task<bool> CheckInventoryItem(Guid characterId, string inventoryItemId, int count)
    {
        throw new NotImplementedException();
    }

    public Task DeleteItemAsync(Guid characterId, Guid inventoryItemId)
    {
        throw new NotImplementedException();
    }
}
