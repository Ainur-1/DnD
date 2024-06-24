using AspNetCore.Identity.MongoDbCore.Models;
using DnD.Areas.Identity.Data;
using DnD.Areas.Identity.Pages;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;

namespace DnD.GameHubs
{
    public class GameHub: Hub
    {
        private static readonly List<GameRoom> _rooms = new ();
        public override async Task OnConnectedAsync()
        {
            Console.WriteLine($"Игрок с ID '{Context.ConnectionId}' подключен");

            await Clients.Caller.SendAsync("Rooms", _rooms.OrderBy(r => r.RoomName));

        }
        //hero -> Character 

        //

        //updateherostat только для владельца перса  ()
        //update iventory только для владельца перса 3 метода ADD DELETE UPDATE
        //только гейммастеру и челу который владеет персом (можноо упростить слать всем) 
        //предложить предмет sujestIventory  GAMEMASTE AND PLAYER
        //принять предмет acceptIventory    ТОЛЬКО ИГРОК
        //UPDATE FIGHT STATUS ЗАВЕршиться или начаться только гейммастер
        //endgame только гейммастер
        //damage только гейммастер
        //



        public async Task<GameRoom> CreateRoom(string name, string playerName)
        {
            var roomId = Guid.NewGuid().ToString();
            var room = new GameRoom(roomId, name);
            _rooms.Add(room);

            var newPlayer = new Player(Context.ConnectionId, playerName);
            room.Players.Add(newPlayer);


            await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
            await Clients.All.SendAsync("Rooms", _rooms.OrderBy(r => r.RoomName));
            Console.WriteLine($"Игрок c id {Context.ConnectionId} Cоздал комнату");

            return room;
        }

        public async Task<GameRoom?> JoinRoom(string roomId, string playerName)
        {
            var room = _rooms.FirstOrDefault(r => r.RoomId == roomId);
            if (room is not null)
            {
                var newPlayer = new Player(Context.ConnectionId, playerName);
                if (room.TryAddPlayer(newPlayer))
                {
                    await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
                    await Clients.Group(roomId).SendAsync("Игрок Присоединился", newPlayer);
                    Console.WriteLine($"Игрок c id {Context.ConnectionId} Присоединился");
                    return room;

                }
            }
            return null;
        }
    }
}
