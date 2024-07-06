using GameHub.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameHub.Service
{
    public interface IIventoryService
    {
        public Task<bool> CheckInventoryItem(Guid characterId, ItemFromInventory itemFromInventory);
        public Task HandleItemSuggestion(GameRoom room, Guid characterId, InventoryItemSuggestion suggestion);
    }
}
