//using DnD.Areas.Identity.Data;

namespace DnD.GameHubs
{
    public class Player//// User
    {
        public string ConnectionId { get; set; }
        public string Name { get; set; }
        public Player(string connectionId, string name)
        {
            ConnectionId = connectionId;
            Name = name;
        }
    }
}
