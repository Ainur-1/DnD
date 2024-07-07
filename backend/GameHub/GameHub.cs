using Contracts.Online;
using Domain.Entities.Character;
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
    private readonly ICharacterService _characterService;
    private readonly IPartyService _partyService;
    private Guid UserId => Guid.Parse(Context.UserIdentifier);
    public GameHub(ICharacterService characterService, IPartyService partyService)
    {
        _characterService = characterService;
        _partyService = partyService;
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
        room.IncrementConnectedPlayers();

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

        if (!await CheckIfPartyKnownAndUserGameMasterAsync())
        {
            return false;
        }

        var partyId = GetPartyByConnection();

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

    public async Task Damage(Guid targetCharacterId, int damageAmount)
    {
        if (!_connectionPartyMapping.TryGetValue(Context.ConnectionId, out var partyId) ||
            !await IsCharacterInParty(targetCharacterId, partyId) || damageAmount <= 0)
        {
            return;
        }

        await _characterService.TakeDamageAsync(targetCharacterId, damageAmount);
    }

    public async Task UpdateFight(FightStatusDto fightStatus)
    {
        if (!await CheckIfPartyKnownAndUserGameMasterAsync() || !RoomRepository.Contains(GetPartyByConnection()))
        {
            return;
        }
        var partyId = GetPartyByConnection();
        var room = RoomRepository.Get(partyId);

        if (fightStatus.IsFight)
        {
            if (fightStatus.ScoreValues == null)
            {
                return;
            }

            var initiativeScores = new Dictionary<Guid, int>();
            var party = await _partyService.GetPartyByIdAsync(partyId);

            if (party == null)
            {
                return;
            }

            foreach (var characterId in party.InGameCharactersIds)
            {
                var characterStats = await _characterService.GetCharacterInGameStatsAsync(characterId);

                if (characterStats == null || characterStats.IsDead)
                {
                    continue;
                }

                var score = fightStatus.ScoreValues.FirstOrDefault(x => x.CharacterId == characterId)?.Score ?? 1;

                if (score < 1)
                {
                    score = 1;
                }
                else if (score > 20)
                {
                    score = 20;
                }

                initiativeScores[characterId] = characterStats.Initiative + score;
            }

            room.SortedInitiativeScores = initiativeScores
                .OrderByDescending(scoreValue => scoreValue.Value)
                .Select(x => (x.Key, x.Value))
                .ToArray();
        }
        else
        {
            room.SortedInitiativeScores = default;
        }

        await Clients.Group(partyId.ToString()).SendAsync("FightStatusUpdate", new
        {
            isFight = room.IsFight,
            orders = room.SortedInitiativeScores?.Select(x => x.CharacterId)
        });
    }
    public async Task SuggestInventoryItem(SuggestInvenotyItemDto suggestInventoryAbout)
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
        throw new NotImplementedException(nameof(SuggestInventoryItem));
    }
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
        throw new NotImplementedException(nameof(AcceptInventory));
    }

    public async Task UpdateCharacterStat(Guid? targetCharacterId, DynamicStatsDto updatedStats)
    {
        if (!_connectionPartyMapping.TryGetValue(Context.ConnectionId, out var partyId))
        {
            return;
        }

        Guid characterId;
        if (await IsGameMasterAsync(partyId))
        {
            if (!targetCharacterId.HasValue
                || targetCharacterId.Value != default
                || !await IsCharacterInParty(targetCharacterId.Value, partyId))
            {
                return;
            }
            characterId = targetCharacterId.Value;
        }
        else if (!_connectionCharacterMapping.TryGetValue(Context.ConnectionId, out characterId))
        {
            return;
        }

        await _characterService.UpdateCharacterInGameStatsAsync(characterId, updatedStats);
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        var conncetionId = Context.ConnectionId;
        _connectionCharacterMapping.TryRemove(conncetionId, out _);
        _connectionPartyMapping.TryRemove(conncetionId, out var partyId);
        if (partyId != default && RoomRepository.Contains(partyId))
        {
            var room = RoomRepository.Get(partyId);
            room.DecrementConnectedPlayers();
            if (room.ConnectedPlayersCount < 1)
            {
                RoomRepository.Delete(partyId);
            }
        }

        return base.OnDisconnectedAsync(exception);
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

    private async Task<bool> CheckIfPartyKnownAndUserGameMasterAsync()
    {
        return _connectionPartyMapping.TryGetValue(Context.ConnectionId, out var partyId)
        && await IsGameMasterAsync(partyId);
    }

    private Guid GetPartyByConnection()
    {
        _connectionPartyMapping.TryGetValue(Context.ConnectionId, out var partyId);
        return partyId;
    }
}
