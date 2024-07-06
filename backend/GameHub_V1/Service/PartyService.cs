using GameHub.Models;

namespace GameHub
{
    public class PartyService
    {

        private readonly List<GameRoom> _rooms;
        public Guid PartyId { get; set; }
        public int xp { get; set; }

        public PartyService(List<GameRoom> rooms)
        {
            _rooms = rooms;
        }

        public async Task<bool> IsGameMaster(Guid userId, Guid partyId)
        {
            var room = _rooms.FirstOrDefault(r => r.PartyId == partyId);
            return room.GameMasterId == userId;

        }

        public async Task EndGameAsync(Guid partyId, int xp)
        {
            var room = _rooms.FirstOrDefault(r => r.PartyId == partyId);
            if (room != null)
            {
                foreach (var player in room.Players)
                {
                    
                    
                }
                
                _rooms.Remove(room);
            }
        }
    }
}
