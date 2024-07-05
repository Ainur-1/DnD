using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GameHub;

namespace Services.Abstractions
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
            var room = _rooms.FirstOrDefault(r => r. == partyId);
            if (room == null)
            {
                return false;
            }

            return room.IsGameMaster(userId);
        }
    }
}
