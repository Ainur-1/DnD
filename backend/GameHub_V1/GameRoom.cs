
using System.Numerics;

namespace GameHub
{
    public class GameRoom
    {

        //маппинг персонаж-конекшен айди
        //public string RoomId => Game.Id;
        public string RoomId { get; set; }

        public string RoomName { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatorName { get; set; }
        public string AccessCode { get; set; }
        public GameDnD Game { get; set; } = new();

        public List<Player> Players { get; set; } = new();
        public Guid GameMasterId { get; set; }

        public GameRoom(string roomId, string roomName, string creatorName, string accesscode, Guid gameMasterId)
        {
            RoomId = roomId;
            RoomName = roomName;
            CreatorName = creatorName;
            CreatedDate = DateTime.UtcNow;
            AccessCode = accesscode;
            GameMasterId = gameMasterId;
        }
        public bool TryAddPlayer(Player newPlayer)
        {
            if (Players.Count < 8 && Players.All(p => p.ConnectionId != newPlayer.ConnectionId))
            {
                Players.Add(newPlayer);
                return true;
            }
            return false;
            /*
            if (Players.Count < 2 && !Players.Any(p => p.ConnectionId == newPlayer.ConnectionId)){
                Players.Add(newPlayer);
                if (Players.Count == 1)
                {
                    Game.PlayerXId = newPlayer.ConnectionId;
                }
                else if (Players.Count == 2)
                {
                    Game.PlayerYId = newPlayer.ConnectionId;

                }
                return true;
            }
            return false;
              */
        }

    }
}



