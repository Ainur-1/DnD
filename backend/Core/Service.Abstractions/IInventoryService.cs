
using Domain.Entities.Game.Items;

namespace Service.Abstractions;

public interface IInventoryService
{
    public Task<bool> CheckInventoryItem(Guid characterId, string inventoryItemId, int count);

    public Task AddItemAsync(Guid characterId, Item item);

    public Task DeleteItemAsync(Guid characterId, Guid inventoryItemId);
}
