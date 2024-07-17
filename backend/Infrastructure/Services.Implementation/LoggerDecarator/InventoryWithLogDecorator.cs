using Contracts;
using Domain.Entities.Game.Items;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Service.Abstractions;

namespace Services.Implementation.LoggerDecorator;

public class InventoryWithLogDecorator : ServiceLoggerBase<IInventoryService>, IInventoryService
{
    private readonly IInventoryService _inventoryService;
    public InventoryWithLogDecorator(
        InventoryService inventoryService,
        ILogger<IInventoryService> logger, 
        IHttpContextAccessor httpContext) : base(logger, httpContext)
    {
        _inventoryService = inventoryService;
    }

    public async Task AddItemAsync(Guid characterId, Item item)
    {
        var task = _inventoryService.AddItemAsync(characterId, item);
        await AwaitWithLogAsync(task, nameof(AddItemAsync));
    }

    public async Task<bool> CheckInventoryItem(Guid characterId, string inventoryItemId, int count)
    {
        var task = _inventoryService.CheckInventoryItem(characterId, inventoryItemId, count);
        await AwaitWithLogAsync(task, nameof(CheckInventoryItem));
        return task.Result;
    }

    public async Task DeleteItemAsync(Guid characterId, Guid inventoryItemId)
    {
        var task = _inventoryService.DeleteItemAsync(characterId, inventoryItemId);
        await AwaitWithLogAsync(task, nameof(DeleteItemAsync));
    }

    public async Task<CharacterInventoryDto> GetCharacterInventoryAsync(Guid issuerId, Guid characterId)
    {
        var task = _inventoryService.GetCharacterInventoryAsync(issuerId, characterId);
        await AwaitWithLogAsync(task, nameof(GetCharacterInventoryAsync));
        return task.Result;
    }
}
