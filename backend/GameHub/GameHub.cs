using AspNetCore.Identity.MongoDbCore.Models;
using Contracs.Online;
using Domain.Entities;
using Domain.Entities.Game.Items;
using Domain.Entities.Parties;
using Domain.Entities.User;
using GameHub.Dtos;
using GameHub.Models;
using GameHub.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Service.Abstractions.Interface;
using System.Collections.Concurrent;

namespace GameHub;

[Authorize]
public class GameHub: Hub
{
    //public static List<Party> _party { get; set; }
    private static readonly List<GameRoom> _rooms = new ();
    private static readonly ConcurrentDictionary<string, Guid> _connectionRoomMapping = new();
    
    private readonly UserManager<User> _userManager;
    private readonly ICharacterService _characterService;
    private readonly IPartyService _partyService;
    private readonly IventoryService _iventoryService;

    public GameHub (ICharacterService characterService, UserManager<User> userManager, IPartyService partyService, IventoryService iventoryService)
    {
        _userManager = userManager;
        _characterService = characterService;
        _partyService = partyService;
        _iventoryService = iventoryService;
    }

    public override async Task OnConnectedAsync()
    {
        Console.WriteLine($"Игрок {_userManager.GetUserNameAsync} с ID '{Context.ConnectionId}' подключен");
    }

    //вход в комнату
    public async Task<GameRoom?> JoinRoomAsync(string accessCode, Guid partyId)
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

            if (await _partyService.IsGameMaster(user.Id, partyId))
            {
                // Если игрок является игровым мастером, присваиваем только PartyId
                _connectionRoomMapping[Context.ConnectionId] = partyId;
            }
            else
            {
                
                var character = await _characterService.GetByIdAsync(user.Id, partyId);

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

            //room.IsFighting = room.IsFight;
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

    //endgame только гейммастер()
    public async Task<bool> EndGame(int xp, Guid partyId)
    {
        var user = await _userManager.GetUserAsync(Context.User);

        // 1) Проверка, является ли пользователь игровым мастером
        if (!await _partyService.IsGameMaster(user.Id, partyId))
        {
            await Clients.Caller.SendAsync("Error", "Вы не являетесь игровым мастером");
            return false;
        }

        // 2) Вызов метода EndGameAsync из PartyService
        await _partyService.EndGameAsync(partyId, xp);
        return true;

        /*todo
         * 1) возврат true false только гейммастер
         * 2) Вызвать метод PartyService EndGameAsync {partyid, xp}
         * 
         */

    }
    //обновление состояние игры
    private async Task GameRoomState(GameRoom room)
    {
        
        //идет ли бой сейчаc isfighting bool
        //order массив стрингов // characterid персонажей по порядку desc //иначе null
        //
        //return 
        //

        // Проверяем, идет ли бой
        bool isFighting = room.IsFighting;

        string[] characterOrder = null;
        if (isFighting && room.SortedInitciativeScores != null)
        {
            characterOrder = room.SortedInitciativeScores
                .OrderByDescending(x => x.Score)
                .Select(s => s.CharacterId.ToString())
                .ToArray();
        }

        // Обновляем состояние комнаты
        var roomState = new
        {
            IsFighting = isFighting,
            CharacterOrder = characterOrder,
        };

        // Отправляем состояние комнаты клиентам
        await Clients.Group(room.PartyId.ToString()).SendAsync("RoomStateUpdate", roomState);

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

        // ) Проверить, привязан ли идентификатор подключения к комнате
        if (!_connectionRoomMapping.TryGetValue(Context.ConnectionId, out var partyId))
        {
            throw new InvalidOperationException("Подключение не связано ни с одной комнатой.");
        }

        // ) Получить комнату по идентификатору комнаты
        var room = _rooms.FirstOrDefault(r => r.PartyId == partyId);
        if (room == null)
        {
            throw new InvalidOperationException("Комната не найдена.");
        }

        // ) Проверить, находится ли целевой персонаж в партии
        var targetCharacter = room.Players.FirstOrDefault(p => p.CharacterId.ToString() == targetCharacterId);
        if (targetCharacter == null)
        {
            throw new InvalidOperationException("Целевой персонаж не найден в партии.");
        }

        // ) Использовать CharacterService для обновления HP целевого персонажа
        var characterStats = await _characterService.GetCharacterInGameStatsAsync(Guid.Parse(targetCharacterId));
        if (characterStats == null)
        {
            throw new InvalidOperationException("Статистика персонажа не найдена.");
        }

        // ) Применить урон к HP персонажа
        await _characterService.TakeDamageAsync(Guid.Parse(targetCharacterId), damageAmount);

        // ) Уведомить всех участников комнаты об обновленном состоянии персонажа
        await Clients.Group(partyId.ToString()).SendAsync("CharacterUpdated", targetCharacterId, characterStats);


        //var connectionId = Context.ConnectionId;
        //var room = _rooms.FirstOrDefault(r => r.RoomId == roomId);

        //if (room != null)
        //{
        //    var gameMaster = room.Players.FirstOrDefault(p => p.ConnectionId == connectionId && p.IsGameMaster);
        //    if (gameMaster != null)
        //    {
        //        var targetPlayer = room.Players.FirstOrDefault(p => p.Id == targetPlayerId);
        //        if (targetPlayer != null)
        //        {
        //            targetPlayer.Health -= damageAmount; //??

        //            await GameRoomState(room);
        //            await Clients.Group(roomId).SendAsync("PlayerDamaged", targetPlayer, damageAmount);
        //            return;
        //        }
        //    }
        //}

        //await Clients.Caller.SendAsync("Error", "Cannot apply damage. Either room not found, player not found, or you don't have the permission.");
    }


    //UPDATE FIGHT STATUS ЗАВЕршиться или начаться только гейммастер()
    public async Task UpdateFight(FightStatusDto fightStatus)
    {
        // 1) Получить идентификатор подключения вызывающего абонента
        var connectionId = Context.ConnectionId;

        // ) Проверить, привязан ли идентификатор подключения к комнате
        if (!_connectionRoomMapping.TryGetValue(connectionId, out var partyId))
        {
            throw new InvalidOperationException("Подключение не связано ни с одной комнатой.");
        }
        // 2) Проверить, является ли пользователь Game Master через сервис PartyService
        var userId = _userManager.GetUserId(Context.User);
        var isGameMaster = await _partyService.IsGameMaster(Guid.Parse(userId), partyId); // 

        if (!isGameMaster)
        {
            throw new UnauthorizedAccessException("Только Game Master может обновлять статус боя.");
        }


        // 4) Получить модификатор ловкости каждого живого персонажа
        var initiativeModifiers = new ConcurrentDictionary<string, int>();
        foreach (var scoreValue in fightStatus.ScoreValues)
        {
            var characterId = Guid.Parse(scoreValue.CharacterId);
            var characterStats = await _characterService.GetCharacterInGameStatsAsync(characterId);

            if (characterStats == null || characterStats.IsDead) // Проверяем, что персонаж живой
            {
                throw new InvalidOperationException("Все персонажи в списке должны быть живыми.");
            }

            initiativeModifiers[scoreValue.CharacterId] = characterStats.Initiative;
        }

        // 4) Если пользователь Game Master, отсортировать значения инициативы по убыванию
        if (isGameMaster)
        {

            fightStatus.ScoreValues = fightStatus.ScoreValues.OrderByDescending(sv => sv.Score).ToArray();
        }

        // 5) Обновить статус боя и разослать событие FIGHT STATUS UPDATE
        var characterOrder = fightStatus.ScoreValues.Select(sv => Guid.Parse(sv.CharacterId)).ToArray();
        await Clients.Group(partyId.ToString()).SendAsync("FightStatusUpdate", fightStatus.IsFight, characterOrder);
        
        /*
         * todo ()
         * 1)Проверяем конекшен Что пользователь гейммастер через сервис 
         * 2)Получить модификатор ловкостити каждого живого персонажа 
         * (кол-во живых персонажей должна быть равно = длине массиву значений из аргументов метода)

         * 3)Если пользователь гейммастер - отсортирвоать значения инициатива (по убыванию (desc))
         * 4)Обновить статус боя и разослать ивент FIGHT STATUS UPDATE {isfight, guid characterorder[]}
         
         */
    }

    //предложить предмет 
    public async Task SuggestInventoryItem(SuggestInvenotyItemDto suggestInventoryAbout)////пока не трогаем
    {

        // Получаем connectionId
        var connectionId = Context.ConnectionId;
        if (!_connectionRoomMapping.TryGetValue(connectionId, out var partyId))
        {
            throw new InvalidOperationException("Подключение не связано ни с одной комнатой.");
        }

        var room = _rooms.FirstOrDefault(r => r.PartyId == partyId);
        if (room == null)
        {
            throw new InvalidOperationException("Комната не найдена.");
        }

        var characterId = room.Players.FirstOrDefault(p => p.ConnectionId == connectionId)?.CharacterId;
        if (characterId == null)
        {
            throw new InvalidOperationException("Персонаж не найден в комнате.");
        }
        var isGameMaster = await _partyService.IsGameMaster(partyId, partyId);/////

        if (isGameMaster)
        {
            // Если присылает гейммастер, то должно быть заполнено поле Item
            if (suggestInventoryAbout.ItemDescription == null)
            {
                throw new InvalidOperationException("Поле Item должно быть заполнено для гейммастера.");
            }
        }
        else
        {
            // Если присылает игрок, должны быть заполнены оба поля Item и ItemfromInventory
            if (suggestInventoryAbout.ItemDescription == null || suggestInventoryAbout.ItemfromInventory == null)
            {
                throw new InvalidOperationException("Для игрока должны быть заполнены оба поля: Item и ItemfromInventory.");
            }

            // Проверяем наличие предмета в инвентаре
            var itemExists = await _iventoryService.CheckInventoryItem(characterId, suggestInventoryAbout.ItemfromInventory);
            if (!itemExists)
            {
                throw new InvalidOperationException("Предмет не найден в инвентаре персонажа.");
            }
        }

        // Обрабатываем предложение предмета
        var suggestion = new InventoryItemSuggestion
        {
            Item = suggestInventoryAbout.ItemDescription,
            itemFromInventory = suggestInventoryAbout.ItemfromInventory
        };

        await _iventoryService.HandleItemSuggestion(room, characterId, suggestion);

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

        //var connectionId = Context.ConnectionId;
        //var room = _rooms.FirstOrDefault(r => r.RoomId == roomId);

        //if (room != null)
        //{
        //    var player = room.Players.FirstOrDefault(p => p.ConnectionId == connectionId);
        //    if (player != null)
        //    {

        //        var inventoryItem = player.Inventory.FirstOrDefault(item => item.Id == itemId);
        //        if (inventoryItem != null)
        //        {
        //            player.AddItemToInventory(inventoryItem);
        //            await GameRoomState(room);
        //            await Clients.Caller.SendAsync("", inventoryItem);


        //            return;
        //        }
        //    }
        //}

        //await Clients.Caller.SendAsync("Error", "Item not found or you're not authorized to accept this item.");
    }

    //принять предмет 
    public async Task<bool> AcceptInventory(string suggestionId)//пока не трогаем
    {

        // Получаем connectionId
        var connectionId = Context.ConnectionId;
        if (!_connectionRoomMapping.TryGetValue(connectionId, out var partyId))
        {
            throw new InvalidOperationException("Подключение не связано ни с одной комнатой.");
        }

        var room = _rooms.FirstOrDefault(r => r.PartyId == partyId);
        if (room == null)
        {
            throw new InvalidOperationException("Комната не найдена.");
        }

        var characterId = room.Players.FirstOrDefault(p => p.ConnectionId == connectionId)?.CharacterId;
        if (characterId == null)
        {
            throw new InvalidOperationException("Персонаж не найден в комнате.");
        }

        // Получаем предложение инвентаря

        // Обработка принятия предложения
        try
        {

        }
        catch (Exception ex)
        {
            // Обработка ошибок
            Console.WriteLine($"Ошибка при принятии предложения инвентаря: {ex.Message}");
            return false;
        }
        return true;
        

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

        //var connectionId = Context.ConnectionId;
        //var room = _rooms.FirstOrDefault(r => r.RoomId == roomId);

        //if (room != null)
        //{
        //    var player = room.Players.FirstOrDefault(p => p.ConnectionId == connectionId);
        //    if (player != null)
        //    {
        //        var inventoryItem = player.Inventory.FirstOrDefault(item => item.Id == itemId);
        //        if (inventoryItem != null)
        //        {
        //            player.AddItemToInventory(inventoryItem);
        //            await GameRoomState(room);
        //            await Clients.Caller.SendAsync("", inventoryItem);

        //            return;
        //        }
        //    }
        //}

        //await Clients.Caller.SendAsync("Error", "Item not found or you're not authorized to accept this item.");
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

        // 1) Получить идентификатор персонажа, связанного с текущим подключением
        var connectionId = Context.ConnectionId;
        if (!_connectionRoomMapping.TryGetValue(connectionId, out var partyId))
        {
            throw new InvalidOperationException("Подключение не связано ни с одной комнатой.");
        }

        var room = _rooms.FirstOrDefault(r => r.PartyId == partyId);
        if (room == null)
        {
            throw new InvalidOperationException("Комната не найдена.");
        }

        var characterId = room.Players.FirstOrDefault(p => p.ConnectionId == connectionId)?.CharacterId;
        if (characterId == null)
        {
            throw new InvalidOperationException("Персонаж не найден в комнате.");
        }

        // 2) Вызвать метод сервиса для обновления статистики персонажа
        await _characterService.UpdateCharacterInGameStatsAsync(characterId.Value, updatedStats);

        // 3) Уведомить всех участников комнаты об обновленной статистике персонажа
        await Clients.Group(partyId.ToString()).SendAsync("CharacterUpdated", characterId.ToString(), updatedStats);


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

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        Console.WriteLine(exception);
    }

    
}
