using AutoMapper;
using Contracts;
using Contracts.Online;
using Contracts.Parties;
using DataAccess.Extensions;
using Domain.Entities.Characters;
using Domain.Entities.Parties;
using Domain.Exceptions;
using GameHub;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using Service.Abstractions;
using System.Collections.Concurrent;

namespace Services.Implementation;

public class PartyService : IPartyService
{
    private readonly IMongoCollection<Party> _partyCollection;
    private readonly IMongoCollection<Character> _characterCollection;
    private readonly IMongoClient _client;
    private readonly IMapper _mapper;
    private readonly IHubContext<GameHub.GameHub, IHubEventActions> _hubContext;

    public PartyService(IMongoCollection<Party> partyCollection,
        IMongoCollection<Character> characterCollection,
        IMongoClient client,
        IMapper mapper,
        IHubContext<GameHub.GameHub, IHubEventActions> hubContext
        )
    {
        _partyCollection = partyCollection;
        _characterCollection = characterCollection;
        _client = client;
        _mapper = mapper;
        _hubContext = hubContext;
    }

    public async Task<Guid> CreatePartyAsync(Guid gameMasterId, string accessCode)
    {
        var newParty = new Party(gameMasterId, accessCode);
        await _partyCollection.InsertOneAsync(newParty);
        return newParty.Id;
    }

    public async Task DisbandPartyAsync(Guid partyId, int xp)
    {
        if (xp < 0)
        {
            throw new InvalidArgumentValueException(nameof(xp))
            {
                InvalidValue = xp,
                ValidExample = "XP должен быть не отрицательным"
            };
        }

        var notDeadCharacterCount = await _characterCollection
            .Find(filter => filter.Info.JoinedPartyId == partyId && !filter.Info.IsDead)
            .CountDocumentsAsync();
        var gainedXp = notDeadCharacterCount == 0 ? 0 : xp / notDeadCharacterCount;

        var filter = Builders<Character>.Filter.Eq(filter => filter.Info.JoinedPartyId, partyId);
        var update = Builders<Character>.Update
            .Set(update => update.Info.JoinedPartyId, null)
            .Set(update => update.InGameStats, null)
            .Inc(xp => xp.Personality.Xp, gainedXp);

        await _characterCollection.UpdateManyAsync(filter, update);
        await _partyCollection.DeleteOneAsync(p => p.Id == partyId);
        //
        await _hubContext.Clients.Group(partyId.ToString()).OnPartyDisband();
    }

    public async Task<IEnumerable<GameCharacterDto>> GetCharactersInfoAsync(Guid partyId)
    {
        var charactersIds = (await _partyCollection
            .FindById(partyId)
            .SingleOrDefaultAsync())
            ?.InGameCharactersIds ?? throw new ObjectNotFoundException();

        var characters = await _characterCollection
            .WhereIdIsIn(charactersIds)
            .ToListAsync();

        return characters
            .Select(_mapper.Map<GameCharacterDto>)
            .ToArray();
    }

    public Task<Party?> GetPartyByIdAsync(Guid partyId)
    {
        return _partyCollection
            .FindById(partyId).
            FirstOrDefaultAsync()!;
    }

    public async Task<IEnumerable<UserPartyDto>> GetUserPartiesAsync(Guid userId)
    {
        var result = new ConcurrentBag<UserPartyDto>();

        var partiesAsUserTask = _characterCollection
            .Find(x => x.Info.OwnerId == userId && x.Info.JoinedPartyId != null)
            .ProjectOnlyIdAndPersonalityAndInfo()
            .ForEachAsync(async character =>
            {
                var party = await GetPartyByIdAsync(character.Info.JoinedPartyId!.Value);
                if (party != null)
                {
                    result.Add(UserPartyDto.FromPartyAndCharacterInfo(party, character.Id, character.Personality.Name));
                }
            });

        var partiesAsGameMasterTask = _partyCollection
            .Find(x => x.GameMasterId == userId)
            .ForEachAsync(party => result.Add(UserPartyDto.FromParty(party)));

        await Task.WhenAll(partiesAsUserTask, partiesAsGameMasterTask);

        return result;
    }

    public async Task<UserPartyDto> GetUserPartyAsync(Guid userId, Guid partyId)
    {
        var party = await GetPartyByIdAsync(partyId);
        if (party == null)
            throw new ObjectNotFoundException();

        if (party.GameMasterId == userId)
            return UserPartyDto.FromParty(party);

        var userCharacter = (await _characterCollection
            .FindByOwnerAndParty(ownerId: userId, partyId: partyId)
            .FirstOrDefaultAsync()) ?? throw new ObjectNotFoundException();

        return UserPartyDto.FromPartyAndCharacterInfo(party, userCharacter.Id, userCharacter.Personality.Name);
    }

    public async Task<bool> IsGameMasterAsync(Guid userId, Guid partyId)
    {
        return await _partyCollection
            .Find(p => p.Id == partyId && p.GameMasterId == userId)
            .AnyAsync();
    }

    public async Task<bool> IsUserInPartyAsync(Guid userId, Guid partyId)
    {
        var someUserCharacterIsInParty = await _characterCollection
            .FindByOwnerAndParty(ownerId: userId, partyId: partyId)
            .AnyAsync();

        return someUserCharacterIsInParty || await IsGameMasterAsync(userId, partyId);
    }

    public async Task<UserPartyDto> JoinPartyAsync(JoinPartyVariablesDto variables)
    {
        var party = await _partyCollection
            .Find(x => x.Id == variables.PartyId && x.AccessCode == variables.AccessCode)
            .SingleOrDefaultAsync();

        if (party == null) throw new ObjectNotFoundException();

        if (await IsUserInPartyAsync(variables.UserId, party.Id))
        {
            throw new InvalidArgumentValueException(nameof(variables.UserId), "Вы уже состоите в отряде.");
        }

        var character = await _characterCollection
            .Find(x => x.Id == variables.CharacterId && variables.UserId == x.Info.OwnerId)
            .SingleOrDefaultAsync();

        if (character == null || character.Info.JoinedPartyId.HasValue)
        {
            throw new InvalidArgumentValueException(nameof(variables.CharacterId));
        }
        else if (character.Info.IsDead)
        {
            throw new AccessDeniedException();
        }

        party.AddCharacter(character);

        var characterFilter = Builders<Character>.Filter.Eq(filter => filter.Id, variables.CharacterId);
        var characterUpdate = Builders<Character>.Update
            .Set(update => update.Info.JoinedPartyId, variables.PartyId)
            .Set(update => update.InGameStats, character.InGameStats);

        var partyFilter = Builders<Party>.Filter.Eq(filter => filter.Id, variables.PartyId);
        var partyUpdate = Builders<Party>.Update.Push(update => update.InGameCharactersIds, variables.CharacterId);

        await _characterCollection.UpdateOneAsync(characterFilter, characterUpdate);
        await _partyCollection.UpdateOneAsync(partyFilter, partyUpdate);
        //
        await _hubContext.Clients
            .Group(variables.PartyId.ToString())
            .OnPartyJoin(_mapper.Map<CharacterDto>(character));
        return UserPartyDto.FromPartyAndCharacterInfo(party, character.Id, character.Personality.Name);
    }
}
