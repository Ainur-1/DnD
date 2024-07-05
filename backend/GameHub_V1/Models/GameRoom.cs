using GameHub.Dtos;
using System.Collections.Concurrent;
using System.Numerics;
using Contracs.Online;

namespace GameHub.Models
{
    public class GameRoom
    {

        private readonly ConcurrentDictionary<string, ConcurrentDictionary<string, InventoryItemSuggestion>> _connectionRoomMapping = new();
        
        public bool IsFight => SortedInitciativeScores != null;
        //public bool IsGameMaster {  get; set; }
        public (Guid CharacterId, int Score)[]? SortedInitciativeScores { get; set; }    
        //public string RoomId { get; set; }
        public Guid PartyId { get; set; }
        public string RoomName { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatorName { get; set; }
        public string AccessCode { get; set; }
        public List<Player> Players { get; set; } = new();
        public Guid GameMasterId { get; set; }
        
        
        // 
        public bool IsFighting { get; set; }
        public string[]? Order { get; set; }
        public GameCharacterDto? Character { get; set; }
        //


        public GameRoom(Guid partyId, string roomName, string creatorName, string accesscode, Guid gameMasterId)
        {
            PartyId = partyId;
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
        }

        public bool IsGameMaster(Guid userId)
        {
            return GameMasterId == userId;
        }

    }
}



