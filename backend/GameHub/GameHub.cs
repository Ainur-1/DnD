using Contracts.Online;
using Domain.Entities.User;
using GameHub.Dtos;
using GameHub.Models;
using GameHub.Repositories;
using GameHub.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Service.Abstractions;
using Services.Implementation;
using System.Collections.Concurrent;

namespace GameHub;

[Authorize]
public class GameHub : Hub
{

    private static readonly ConcurrentDictionary<string, Guid> _connectionPartyMapping = new();
    private static readonly ConcurrentDictionary<string, Guid> _connectionCharacterMapping = new();

    private readonly OldCharacterService _characterService;
    private readonly IPartyService _partyService;
    private readonly OldInventoryService _iventoryService;
    private Guid UserId => Guid.Parse(Context.UserIdentifier);

    public GameHub(OldCharacterService characterService, IPartyService partyService, OldInventoryService iventoryService)
    {
        _characterService = characterService;
        _partyService = partyService;
        _iventoryService = iventoryService;
    }

    public override async Task OnConnectedAsync()
    {
        Console.WriteLine($"Игрок с ID:{Context.UserIdentifier} ConId:'{Context.ConnectionId}' подключен");
    }

    public async Task<GameRoomDto?> JoinRoomAsync(Guid partyId)
    {
        var userId = UserId;

        if (await _partyService.IsUserInPartyAsync(userId, partyId))
        {
            return null;
        }

        await Groups.AddToGroupAsync(Context.ConnectionId, partyId.ToString());

        if (!RoomRepository.Contains(partyId))
        {
            RoomRepository.Add(new GameRoomState(partyId));
        }
        var room = RoomRepository.Get(partyId);
        
        _connectionPartyMapping[Context.ConnectionId] = partyId;

        if (!await IsGameMasterAsync(partyId))
        {
            var character = await _characterService.GetByIdAsync(userId, partyId);

            if (character != null)
            {
                _connectionCharacterMapping[Context.ConnectionId] = character.Id;
            }
            else
            {
                throw new InvalidOperationException();
                //todo: Логировать исключителньую ситуацию 
            }
        }

        var characters = await _partyService.GetCharactersInfoAsync(partyId);

        return new GameRoomDto
        {
            Characters = characters,
            IsFight = room.IsFight,
            Order = room.SortedInitiativeScores?.Select(x => x.CharacterId)
        };
    }

    public async Task<bool> EndGame(int xp)
    {
        if (!_connectionPartyMapping.TryGetValue(Context.ConnectionId, out var partyId) 
            || !await IsGameMasterAsync(partyId))
        {
            return false;
        }

        try
        {
            await _partyService.DisbandPartyAsync(partyId, xp);
        }
        catch 
        { 
            return false; 
        }

        RoomRepository.Delete(partyId);

        foreach (var (key, value) in _connectionCharacterMapping.ToList())
        {
            if (value == partyId)
            {
                _connectionCharacterMapping.TryRemove(key, out _);
            }
        }

        return true;
    }

    //обновление состояние игры
    private async Task GameRoomState(GameRoomState room)
    {

        //идет ли бой сейчаc isfighting bool
        //order массив стрингов // characterid персонажей по порядку desc //иначе null
        //
        //return 
        //

        // Проверяем, идет ли бой
        bool isFighting = room.IsFighting;

        string[] characterOrder = null;
        if (isFighting && room.SortedInitiativeScores != null)
        {
            characterOrder = room.SortedInitiativeScores
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

    public async Task Damage(Guid targetCharacterId, int damageAmount)
    {
        if (!_connectionPartyMapping.TryGetValue(Context.ConnectionId, out var partyId) || 
            !await IsCharacterInParty(targetCharacterId, partyId) || damageAmount <= 0)
        {
            return;
        }

        await _characterService.TakeDamageAsync(targetCharacterId, damageAmount);
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
        // 1) Получить идентификатор подключения вызывающего абонента
        var connectionId = Context.ConnectionId;

        // ) Проверить, привязан ли идентификатор подключения к комнате
        if (!_connectionPartyMapping.TryGetValue(connectionId, out var partyId))
        {
            throw new InvalidOperationException("Подключение не связано ни с одной комнатой.");
        }
        // 2) Проверить, является ли пользователь Game Master через сервис PartyService
        var userId = _userManager.GetUserId(Context.User);
        var isGameMaster = await _partyService.IsGameMasterAsync(Guid.Parse(userId), partyId); // 

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


    }

    //предложить предмет 
    public async Task SuggestInventoryItem(SuggestInvenotyItemDto suggestInventoryAbout)////пока не трогаем
    {

        // Получаем connectionId
        var connectionId = Context.ConnectionId;
        if (!_connectionPartyMapping.TryGetValue(connectionId, out var partyId))
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
        var isGameMaster = await _partyService.IsGameMasterAsync(partyId, partyId);/////

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
            var suggestionItem = suggestInventoryAbout!.ItemfromInventory;
            var itemExists = await _iventoryService.CheckInventoryItem(characterId.Value!, suggestionItem.InventoryItemId.ToString(), suggestionItem.Count);
            if (!itemExists)
            {
                throw new InvalidOperationException("Предмет не найден в инвентаре персонажа.");
            }
        }

        // Обрабатываем предложение предмета
        var suggestion = new InventoryItemSuggestion
        {
            Item = suggestInventoryAbout.ItemDescription,
            ItemFromInventory = suggestInventoryAbout.ItemfromInventory
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
        if (!_connectionPartyMapping.TryGetValue(connectionId, out var partyId))
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
    public async Task UpdateCharacterStat(DynamicStatsDto updatedStats)
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
        if (!_connectionPartyMapping.TryGetValue(connectionId, out var partyId))
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
    private async Task<bool> IsGameMasterAsync(Guid partyId)
    {
        var party = await _partyService.GetPartyByIdAsync(partyId);
        
        return party != null && party.GameMasterId == UserId;
    }

    private async Task<bool> IsCharacterInParty(Guid characterId, Guid partyId)
    {
        var party = await _partyService.GetPartyByIdAsync(partyId);

        return party != null && party.InGameCharactersIds.Contains(characterId);
    }
}
