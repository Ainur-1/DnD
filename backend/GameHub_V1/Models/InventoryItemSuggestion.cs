using Domain.Entities.Game.Items;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameHub.Models
{
    public class InventoryItemSuggestion
    {
        public Item Item { get; set; }
        public ItemFromInventory? itemFromInventory { get; set; }
    }
}
