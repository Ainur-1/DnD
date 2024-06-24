
namespace DnD.GameHubs
{
    public class GameRoom
    {
        public class GameDnD
        {
            public string? PlayerXId { get; set; }
            public string? PlayerYId { get; set; }
            public string Id { get; set; }
            //список персонажей
            //айдишник игры
            //айдишник гейммастера?
            //состояние боя булл  если идет хранить порядок хода    idhero - инициатива в порядке убывания 
            //маппинг персонаж - список предложений инвентаря (изменения инвентаря)
            //

        }
        //маппинг персонаж-конекшен айди
        //public string RoomId => Game.Id;
        public string RoomId { get; set; }
        public string RoomName { get; set; }

        public GameRoom(string roomId, string roomName)
        {
            RoomId = roomId;
            RoomName = roomName;
        }

        public List<Player> Players { get; set; } = new();
        public GameDnD Game { get; set; } = new();

        public bool TryAddPlayer(Player newPlayer)
        {
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
                
        }

    }
}



