//using DnD.Areas.Identity.Data;

using Domain.Entities.Game.Items;

namespace GameHub
{
    public class Player//// User
    {
        public string Id { get; set; }
        public string ConnectionId { get; set; }
        public List<InventoryItem> Inventory { get; set; }
        public string Name { get; set; }

        public bool IsGameMaster { get; set; }

        public Player(string connectionId, string name, bool isGameMaster = false)
        {
            ConnectionId = connectionId;
            Name = name;
            IsGameMaster = isGameMaster;
        }

        public void AddItemToInventory(InventoryItem item)
        {
            Inventory.Add(item);
        }
    }
}
