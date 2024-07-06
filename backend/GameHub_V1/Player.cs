//using DnD.Areas.Identity.Data;

using Domain.Entities.Game.Items;

namespace GameHub
{
    public class Player//// User
    {
        public Guid CharacterId { get; set; }
        public string ConnectionId { get; set; }
        public Guid UserIdentidier { get; set; }
        
        //public bool IsGameMaster { get; set; }

        public Player(string connectionId, Guid userIdentifier)
        {
            ConnectionId = connectionId;
            UserIdentidier = userIdentifier;
        }

    }
}
