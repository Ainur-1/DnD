using Contracts;

namespace GameHub
{
    public class Player//// User
    {
        public Guid CharacterId { get; set; }
        public Guid UserIdentidier { get; set; }
        public string ConnectionId { get; set; }
        public DynamicStatsDto DynamicStatsDto { get; set; }
        public CharacterPersonalityDto Personality { get; set; }

        public int XP { get; set; }
        
        //public bool IsGameMaster { get; set; }

        public Player(string connectionId, Guid userIdentifier)
        {
            ConnectionId = connectionId;
            UserIdentidier = userIdentifier;
        }

    }
}
