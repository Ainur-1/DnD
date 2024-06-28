using AspNetCore.Identity.MongoDbCore.Models;
using Contracs.Online;
using Domain.Entities;
using Domain.Entities.Game.Items;
using Domain.Entities.Parties;
using GameHub.Dtos;
using GameHub.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Services.Abstractions;
using System;
using System.Collections.Concurrent;
using System.Security.Claims;

namespace GameHub;

[Authorize]
public class GameHub: Hub, IGameHub
{
    public static Party party { get; set; }
    private static readonly List<GameRoom> _rooms = new ();
    private static readonly ConcurrentDictionary<string, string> _connectionRoomMapping = new();
    
    private readonly ICharacterService _characterService;
    public GameHub (ICharacterService characterService)
    {
        _characterService = characterService;
    }

    public override async Task OnConnectedAsync()
    {
        Console.WriteLine($"Игрок с ID '{Context.ConnectionId}' подключен");

        await Clients.Caller.SendAsync("Rooms", _rooms.OrderBy(r => r.RoomId));

    }


    //UPDATE FIGHT STATUS ЗАВЕршиться или начаться только гейммастер()
    public async Task UpdateFight(FightStatusDto fightStatus)
    {
        /*
         * todo ()
         * 1)Проверяем конекшен Что пользователь гейммастер через сервис 
         * 2)Получить модификатор ловкостити каждого живого персонажа 
         * (кол-во живых персонажей должна быть равно = длине массиву значений из аргументов метода)

         * 3)Если пользователь гейммастер - отсортирвоать значения инициатива (по убыванию (desc))
         * 4)Обновить статус боя и разослать ивент FIGHT STATUS UPDATE {isfight, guid characterorder[]}
         
         
         */
    }

    //endgame только гейммастер(+)
    public async Task<bool> EndGame(int xp)
    {
        /*todo
         * 1) возврат true false только гейммастер
         * 2) Вызвать метод PartyService EndGameAsync {partyid, xp}
         * 
         */
    }


    //присоединения в комнату
    public async Task<GameRoom?> JoinRoom(string partyId, string accessCode)
    {

        /*todo
         * 1) Получить парти по айдишнику
         * 2) Проверить аксесс код 
         * 3) Проверить что пользователь есть в парти и получить айди персонажа пользователя 
         * (если это гейммастер пропустить связанное с персонажем)
           4) Сохранить всю инфу по конекшену {}
                con_id - partyid
                con_id - characterid
            

           5) Вернуть isfighting bool
                      order массив стрингов // characterid персонажей по порядку desc //иначе null
                      CharacterDTO    
           
           (1-3) иначе возвращем null
         */



        //partyId and accescode argument 
        //просто конекшен присодеиняеться 
        //прислать только конекшены
        //return всех персонажей без инвентаря 
        //dto data transfer object 
        //

        //идет ли бой сейчаc isfighting bool
        //order массив стрингов // characterid персонажей по порядку desc //иначе null
        //
        //return 

        //
        //
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

    //обновление состояние игры
    private async Task GameRoomState(GameRoom room)
    {
        //character update
        //идет ли бой сейчаc isfighting bool
        //order массив стрингов // characterid персонажей по порядку desc //иначе null
        //
        //return 
        //
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

    //нанесения уровна
    public async Task Damage(string targetCharacterId, int damageAmount)
    {

        /*todo
         * 1) Проверить получить комнату партиайди по конекшену, проверить что в парти есть таргет,PARTYsERVICES 
         * 2) Через сервис обновить hp (takedamge добавить в characterservic)
         * 3) Разослать в сервисе всем в комнате персонаж обновился 
         * 
         *
         */

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

                    await GameRoomState(room);
                    await Clients.Group(roomId).SendAsync("PlayerDamaged", targetPlayer, damageAmount);
                    return;
                }
            }
        }

        await Clients.Caller.SendAsync("Error", "Cannot apply damage. Either room not found, player not found, or you don't have the permission.");
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

    /*
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
    }*/


    //принять предмет 
    public async Task SuggestInventoryItem(SuggestInvenotyItemDto suggestInvenotyAbout)
    {
        /*это может прислать обычнйыы игрок и гейммастер
         * если присылает гейммастер то это поле item
         * ecли присылает игрок оба поля item и inventory item 
         * если это inventory item то нужно проверить этот предмет на наличие в инвентаре (в сервисах)
         * если это item то нечего
         * 
         * todo(пока не делаем): валидировать Item
         * todo
         * 0) Сгенерировать айди предолжения, 
         * 1) Сохранить информация о предожени 
         * 2) Послать адресату инфо о предложении { suggestionId, item}
         * 
         * 
         */

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
                    await GameRoomState(room);
                    await Clients.Caller.SendAsync("", inventoryItem);


                    return;
                }
            }
        }

        await Clients.Caller.SendAsync("Error", "Item not found or you're not authorized to accept this item.");
    }

    //принять предмет 
    public async Task<bool> AcceptInventory(string suggestionId)
    {
        /*todo
         * 1) Получить по конекшну characterId 
         * 2) Посмотреть если в словаре предложения, Если предложения нет - вернуть false 
         * 3) Обработать добавления предмета, в сервисах сделать методы
         * 
         * Выделить методы createitem takeitemfromanother (возможно в отдельном сервисе)
         * Вызвать один из методов основываясь на предложении 
         * 
         * 4) Вернуть true если все ок, иначе false (trycatch)
         * 
         */

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
                    await GameRoomState(room);
                    await Clients.Caller.SendAsync("", inventoryItem);


                    return;
                }
            }
        }

        await Clients.Caller.SendAsync("Error", "Item not found or you're not authorized to accept this item.");
    }

    // Метод обновления стат персонажа
    public async Task UpdateCharacterStat(DinymicStatsDto updatedStats)
    {
        /*Todo
         * Получить айди персонажа свзянного по конекшону 
         * Вызвать метод сервисы updatedcharacter
         * todo Разослать в сервисе всем в комнате событие character updated:
         * {id, updatedstats
         * }
         */
        var a = new { abc = "abc" };
        /*
        var room = _rooms.FirstOrDefault(r => r.RoomId == roomId);
        if (room != null)
        {
            var player = room.Players.FirstOrDefault(p => p.Id == playerId);
            if (player != null)
            {

                //player.Stats[statName] = newValue;
                //await _characterService.UpdateCharacterInGameStatsAsync
                //await Clients.Group(roomId).SendAsync("CharacterUptaded",);
                await GameRoomState(room);
                return room;
            }
        }
        return null;*/
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        Console.WriteLine(exception);
    }

    
}
