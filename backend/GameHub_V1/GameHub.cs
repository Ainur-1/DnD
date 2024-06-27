using AspNetCore.Identity.MongoDbCore.Models;
using Domain.Entities;
using Domain.Entities.Game.Items;
using Domain.Entities.Parties;
using Microsoft.AspNetCore.Authorization;

//using DnD.Areas.Identity.Data;
//using DnD.Areas.Identity.Pages;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;

namespace GameHub;

[Authorize]
public class GameHub: Hub, IGameHub
{
    public static Party party { get; set; }
    private static readonly List<GameRoom> _rooms = new ();
    
    private static readonly ConcurrentDictionary<string, string> _connectionRoomMapping = new();

    public override async Task OnConnectedAsync()
    {
        Console.WriteLine($"Игрок с ID '{Context.ConnectionId}' подключен");

        await Clients.Caller.SendAsync("Rooms", _rooms.OrderBy(r => r.RoomId));

    }


    //Есть ошбики((((((((((Возможно что то не понял не допонял.

    //updateherostat только для владельца перса  (+)

    //update iventory только для владельца перса 3 метода(+-)
    //ADD DELETE UPDATE только гейммастеру и челу который владеет персом (можноо упростить слать всем) 

    //предложить предмет sujestIventory  GAMEMASTE AND PLAYER(-)

    //принять предмет acceptIventory    ТОЛЬКО ИГРОК(+)

    //UPDATE FIGHT STATUS ЗАВЕршиться или начаться только гейммастер(+-)

    //endgame только гейммастер(+)

    //damage только гейммастер(+)


    //создание комнаты
    public async Task<GameRoom> CreateRoom(string Roomname)
    {
        var random = new Random();

        var accescode = random.Next(10000000, 99999999).ToString();
        //var partyId = party.Id;
        var roomId = party.Id.ToString();
        var playerName = Context.User.Identity.Name;
        var gameMasterId = Guid.NewGuid();

        var room = new GameRoom(roomId, Roomname, playerName, accescode, gameMasterId);
        _rooms.Add(room);

        var newPlayer = new Player(Context.ConnectionId, playerName);
        room.Players.Add(newPlayer);
        _connectionRoomMapping[Context.ConnectionId] = roomId;

        await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
        await Clients.All.SendAsync("Rooms", _rooms.OrderBy(r => r.RoomId));
        Console.WriteLine($"Игрок c id {Context.ConnectionId} Cоздал комнату");

        return room;
    }

    //присоединения в комнату
    public async Task<GameRoom?> JoinRoom(string roomId, string playerName, string accessCode, string playerId, string partyId)
    {

        var room = _rooms.FirstOrDefault(r => r.RoomId == roomId);
        if (room is not null && room.AccessCode == accessCode)
        {
            var newPlayer = new Player(Context.ConnectionId, playerName);
            if (room.TryAddPlayer(newPlayer))
            {

                _connectionRoomMapping[Context.ConnectionId] = roomId;
                await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
                await Clients.Group(roomId).SendAsync("Игрок Присоединился", newPlayer);
                Console.WriteLine($"Игрок c id {Context.ConnectionId} присоединился к комнате с кодом доступа {accessCode}");

                //await UpdateGameState(room);//
                return room;

            }
            else
            {
                await Clients.Caller.SendAsync("Комната заполнена");
            }

        }
        return null;
    }


    public async Task GetAvailableRooms()//список доступных комнат которые не заполненные
    {
        var availableRooms = _rooms.Select(room => new
        {
            room.RoomId,
            room.RoomName,
            room.CreatorName,
            CreatedDate = room.CreatedDate.ToString("yyyy-MM-dd HH:mm:ss")
        }).OrderBy(r => r.RoomName);
        await Clients.Caller.SendAsync("Доступные комнаты", availableRooms);
    }

    //конец игры
    public async Task EndGame(string roomId)
    {
        var connectionId = Context.ConnectionId;
        var room = _rooms.FirstOrDefault(r => r.RoomId == roomId);

        if (room != null)
        {
            var gameMaster = room.Players.FirstOrDefault(p => p.ConnectionId == connectionId && p.IsGameMaster);
            if (gameMaster != null)
            {
                // Логика завершения игры (например, очистка комнаты, отправка уведомлений)
                _rooms.Remove(room);
                await Clients.Group(roomId).SendAsync("GameEnded", roomId);
                return;
            }
        }

        await Clients.Caller.SendAsync("Error");
    }

    //нанесения уровна
    public async Task Damage(string roomId, string targetPlayerId, int damageAmount)
    {
        var connectionId = Context.ConnectionId;
        var room = _rooms.FirstOrDefault(r => r.RoomId == roomId);

        if (room != null)
        {
            var gameMaster = room.Players.FirstOrDefault(p => p.ConnectionId == connectionId && p.IsGameMaster);
            if (gameMaster != null)
            {
                var targetPlayer = room.Players.FirstOrDefault(p => p.Id == targetPlayerId);
                if (targetPlayer != null)
                {
                    targetPlayer.Health -= damageAmount; //??

                    await UpdateGameState(room);
                    await Clients.Group(roomId).SendAsync("PlayerDamaged", targetPlayer, damageAmount);
                    return;
                }
            }
        }

        await Clients.Caller.SendAsync("Error", "Cannot apply damage. Either room not found, player not found, or you don't have the permission.");
    }

    //принять предмет 
    public async Task AcceptInventory(string roomId, string itemId)
    {
        var connectionId = Context.ConnectionId;
        var room = _rooms.FirstOrDefault(r => r.RoomId == roomId);

        if (room != null)
        {
            var player = room.Players.FirstOrDefault(p => p.ConnectionId == connectionId);
            if (player != null)
            {
                var inventoryItem = player.Inventory.FirstOrDefault(item => item.Id == itemId);
                if (inventoryItem != null)
                {
                    player.AddItemToInventory(inventoryItem);
                    await UpdateGameState(room);
                    await Clients.Caller.SendAsync("ItemAccepted", inventoryItem);
                    return;
                }
            }
        }

        await Clients.Caller.SendAsync("Error", "Item not found or you're not authorized to accept this item.");
    }

    // Метод обновления стат персонажа
    public async Task<GameRoom> UpdateCharacterStat(string roomId, string playerId, string statName, int newValue)
    {
        var room = _rooms.FirstOrDefault(r => r.RoomId == roomId);
        if (room != null)
        {
            var player = room.Players.FirstOrDefault(p => p.Id == playerId);
            if (player != null)
            {
                
                // player.Stats[statName] = newValue;
                await UpdateGameState(room);
                return room;
            }
        }
        return null;
    }

    // Метод для работы с инвентарем Добавление 
    public async Task<GameRoom> AddToInventory(string roomId, string playerId, InventoryItem newItem)
    {
        var room = _rooms.FirstOrDefault(r => r.RoomId == roomId);
        if (room != null)
        {
            var player = room.Players.FirstOrDefault(p => p.Id == playerId);
            if (player != null)
            {
                player.Inventory.Add(newItem);
                await UpdateGameState(room);
                return room;
            }
        }
        return null;
    }
    // Методы для работы с инвентарем Удаление
    public async Task<GameRoom> RemoveFromInventory(string roomId, string playerId, string itemId)
    {
        var room = _rooms.FirstOrDefault(r => r.RoomId == roomId);
        if (room != null)
        {
            var player = room.Players.FirstOrDefault(p => p.Id == playerId);
            if (player != null)
            {
                var itemToRemove = player.Inventory.FirstOrDefault(item => item.Id == itemId);
                if (itemToRemove != null)
                {
                    player.Inventory.Remove(itemToRemove);
                    await UpdateGameState(room);
                    return room;
                }
            }
        }
        return null;
    }

 
    //обновление состояние игры
    private async Task UpdateGameState(GameRoom room)
    {
        var gameState = new
        {
            RoomId = room.RoomId,
            Players = room.Players.Select(p => new
            {
                p.ConnectionId,
                p.Name,
                p.Id,
                p.IsGameMaster
            })
        };
        await Clients.Group(room.RoomId).SendAsync("GameStateUpdated", gameState);
    }


    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        Console.WriteLine(exception);
    }

    public Task<GameRoom?> JoinRoom(string roomId, string playerName, string accessCode)
    {
        throw new NotImplementedException();
    }

}
