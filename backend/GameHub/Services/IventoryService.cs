using GameHub.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GameHub.Models;
using Service.Abstractions.Interface;

namespace GameHub.Service
{
    public class IventoryService
    {
        public async Task<bool> CheckInventoryItem(Guid? characterId, ItemFromInventory itemFromInventory)
        {
            return true;//
        }

        public async Task HandleItemSuggestion(GameRoom room, Guid? characterId, InventoryItemSuggestion suggestion)
        {
            //
        }
    }
}
