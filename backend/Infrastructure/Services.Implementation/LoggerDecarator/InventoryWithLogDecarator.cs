using Domain.Entities.Game.Items;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Service.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Implementation.LoggerDecarator;

public class InventoryWithLogDecarator : ServiceLoggerBase<IInventoryService>, IInventoryService
{
    private readonly IInventoryService _inventoryService;
    public InventoryWithLogDecarator(
        IInventoryService inventoryService,
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
}
