using Domain.Entities.Game.Items;
using GameHub.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameHub.Dtos
{
    public class SuggestInvenotyItemDto
    {
        public string TargetCharacterId { get; set; }
        public ItemFromInventory? ItemfromInventory { get; set; }
        public Item? ItemDescription { get; set; }
    }
}

