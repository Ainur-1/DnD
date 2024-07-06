using GameHub.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Abstractions.Interface
{
    public interface IIventoryService
    {
        public Task<bool> CheckInventoryItem(Guid characterId, ItemFromInventory itemFromInventory);
        public Task HandleItemSuggestion(GameRoom room, Guid characterId, InventoryItemSuggestion suggestion);
    }
}
