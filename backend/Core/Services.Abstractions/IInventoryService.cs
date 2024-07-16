
using Contracts;
using Domain.Entities.Game.Items;
using Services.Abstractions;

namespace Service.Abstractions;

public interface IInventoryService: IDomainService
{
    public Task<bool> CheckInventoryItem(Guid characterId, string inventoryItemId, int count);

    public Task AddItemAsync(Guid characterId, Item item);

    public Task DeleteItemAsync(Guid characterId, Guid inventoryItemId);

    public Task<CharacterInventoryDto> GetCharacterInventoryAsync(Guid issuerId, Guid characterId);
}
