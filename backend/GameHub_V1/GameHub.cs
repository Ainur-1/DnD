using AspNetCore.Identity.MongoDbCore.Models;
using Contracs.Online;
using Domain.Entities;
using Domain.Entities.Game.Items;
using Domain.Entities.Parties;
using Domain.Entities.User;
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
public class GameHub: Hub
{
    public static List<Party> _party { get; set; }
    private static readonly List<GameRoom> _rooms = new ();
    private static readonly ConcurrentDictionary<string, Guid> _connectionRoomMapping = new();
    private readonly UserManager<User> _userManager;

    private readonly ICharacterService _characterService;
    private readonly IPartyService _partyService;


    public GameHub (ICharacterService characterService, UserManager<User> userManager, IPartyService partyService)
    {
        _userManager = userManager;
        _characterService = characterService;
        _partyService = partyService;
    }

    public override async Task OnConnectedAsync()
    {
        Console.WriteLine($"Игрок {_userManager.GetUserNameAsync} с ID '{Context.ConnectionId}' подключен");


    }

    //вход в комнату
    public async Task<GameRoom?> JoinRoom(string accessCode, Guid partyId)
    {
        var room = _rooms.FirstOrDefault(r => r.PartyId == partyId);

        if (room == null)
        {
            await Clients.Caller.SendAsync("Error", "Комната не найдена");
            return null;
        }
        if (room.AccessCode != accessCode)
        {
            await Clients.Caller.SendAsync("Error", "Неверный код доступа");
            return null;
        }

        var user = await _userManager.GetUserAsync(Context.User);
        var newPlayer = new Player(Context.ConnectionId, user.Id);

        //Добавляем игрока в комнату
        if (room.TryAddPlayer(newPlayer))
        {

            GameCharacterDto? characterDTO = null;

            if (room.IsGameMaster(user.Id))
            {
                // Если игрок является игровым мастером, присваиваем только PartyId
                _connectionRoomMapping[Context.ConnectionId] = partyId;
            }
            else
            {

                
                var character = await _characterService.GetByIdAsync(user.Id);

                if (character != null)
                {
                    _connectionRoomMapping[Context.ConnectionId] = partyId;
                    _connectionRoomMapping[Context.ConnectionId] = character;

                    
                    characterDTO = new GameCharacterDto
                    {
                        Id = character.Id,
                    };
                }
                else
                {
                    await Clients.Caller.SendAsync("Error", "Персонаж не найден");
                    return null;
                }
            }


            await Groups.AddToGroupAsync(Context.ConnectionId, partyId.ToString());
            await Clients.Group(partyId.ToString()).SendAsync($"Игрок {_userManager.GetUserNameAsync} Присоединился", newPlayer);
            Console.WriteLine($"Игрок {_userManager.GetUserNameAsync} c id {Context.ConnectionId} присоединился к комнате");

            room.IsFighting = room.IsFight;
            if (room.IsFight)
            {
                room.Order = room.SortedInitciativeScores?.OrderByDescending(x => x.Score)
                                                         .Select(x => x.CharacterId.ToString())
                                                         .ToArray();
            }
            room.Character = characterDTO;

            return room;

        }
        else
        {
            await Clients.Caller.SendAsync("Комната заполнена");
            return null;
        }

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

        var connectionId = Context.ConnectionId;
        var room = _rooms.FirstOrDefault(r => r.PartyId == partyId);

        if (room != null)
        {
            var gameMaster = room.Players.FirstOrDefault(p => p.ConnectionId == connectionId && p.IsGameMaster);
            if (gameMaster != null)
            {
                // Логика завершения игры (например, очистка комнаты, отправка уведомлений)


                await _partyService.EndGameAsync(partyId, xp);

                _rooms.Remove(room);
                await Clients.Group().SendAsync("GameEnded", roomId);
                return;
            }
        }

        await Clients.Caller.SendAsync("Error");
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

        // Проверка, идет ли бой сейчас
        bool isFighting = room.IsFight; // Предположим, что у вас есть свойство, определяющее статус боя

        // Получение порядка хода персонажей
        var order = isFighting ? room.SortedInitciativeScores : null;

        // Сборка состояния игры
        var gameState = new
        {
            RoomId = room.PartyId,
            IsFighting = isFighting,
            Order = order,
            Players = room.Players.Select(p => new
            {
                p.ConnectionId,
                Character = _characterService.GetByIdAsync(p.CharacterId).Result // Получение персонажа игрока
            })
        };

        await Clients.Group(room.PartyId.ToString()).SendAsync("GameStateUpdated", gameState);
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


    //public async Task GetAvailableRooms()//список доступных комнат которые не заполненные
    //{
    //    var availableRooms = _rooms.Select(room => new
    //    {
    //        room.RoomId,
    //        room.RoomName,
    //        room.CreatorName,
    //        CreatedDate = room.CreatedDate.ToString("yyyy-MM-dd HH:mm:ss")
    //    }).OrderBy(r => r.RoomName);
    //    await Clients.Caller.SendAsync("Доступные комнаты", availableRooms);
    //}
    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        Console.WriteLine(exception);
    }

    
}
