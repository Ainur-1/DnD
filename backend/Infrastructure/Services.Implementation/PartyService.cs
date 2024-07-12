using AutoMapper;
using Contracts;
using Contracts.Online;
using Contracts.Parties;
using DataAccess.Extensions;
using Domain.Entities.Character;
using Domain.Entities.Parties;
using Domain.Exceptions;
using GameHub;
using GameHub.Dtos;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using Service.Abstractions;
using System.Collections.Concurrent;

namespace Services.Implementation;

public class PartyService : IPartyService
{
    private readonly IMongoCollection<Party> _partyCollection;
    private readonly IMongoCollection<CharacterAggregate> _characterCollection;
    private readonly IMongoClient _client;
    private readonly IMapper _mapper;
    private readonly IHubContext<GameHub.GameHub, IHubEventActions> _hubContext;

    public PartyService(IMongoCollection<Party> partyCollection, 
        IMongoCollection<CharacterAggregate> characterCollection, 
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

        using var session = await _client.StartSessionAsync();
        session.StartTransaction();
        try
        {
            var notDeadCharacterCount = await _characterCollection
                .Find(filter => filter.Info.JoinedPartyId == partyId && !filter.Info.IsDead)
                .CountDocumentsAsync();
            var gainedXp = notDeadCharacterCount == 0 ? 0 : xp / notDeadCharacterCount;

            var filter = Builders<CharacterAggregate>.Filter.Eq(filter => filter.Info.JoinedPartyId, partyId);
            var update = Builders<CharacterAggregate>.Update
                .Set(update => update.Info.JoinedPartyId, null)
                .Set(update => update.InGameStats, null)
                .Inc(xp => xp.Personality.Xp, gainedXp);

            await _characterCollection.UpdateManyAsync(session, filter, update);
            await _partyCollection.DeleteOneAsync(session, p => p.Id == partyId);
            await session.CommitTransactionAsync();
        }
        catch (Exception)
        {
            await session.AbortTransactionAsync();
        }
        //
        await _hubContext.Clients.Group(partyId.ToString()).OnPartyDisband();
    }

    public async Task<IEnumerable<GameCharacterDto>> GetCharactersInfoAsync(Guid partyId)
    {
        var characterIdsOnlyProjection = Builders<Party>.Projection
            .Exclude(x => x.Id)
            .Exclude(x => x.GameMasterId)
            .Exclude(x => x.AccessCode)
            .Include(x => x.InGameCharactersIds);

        var charactersIds = (await _partyCollection
            .FindById(partyId)
            .Project(x => x.InGameCharactersIds)
            .SingleOrDefaultAsync()) ?? throw new ObjectNotFoundException();

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

        var onlyIdAndNameProjection = Builders<CharacterAggregate>.Projection
            .Exclude(x => x.Inventory)
            .Exclude(x => x.Info)
            .Exclude(x => x.Stats)
            .Exclude(x => x.InGameStats)
            .Exclude(x => x.Personality)
            .Include(x => x.Id)
            .Include(x => x.Personality.Name);

        var fetchTask = _characterCollection
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

        await fetchTask;
        return result;
    }

    public async Task<UserPartyDto> GetUserPartyAsync(Guid userId, Guid partyId)
    {
        var party = await GetPartyByIdAsync(partyId);
        if (party == null)
            throw new ObjectNotFoundException();
        
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
            .FindById(variables.PartyId)
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

        party.AddCharacter(character.Id);
        character.InitializeInGameStats();

        using var session = await _client.StartSessionAsync();
        session.StartTransaction();
        try
        {

            var characterFilter = Builders<CharacterAggregate>.Filter.Eq(filter => filter.Id, variables.CharacterId);
            var characterUpdate = Builders<CharacterAggregate>.Update
                .Set(update => update.Info.JoinedPartyId, variables.PartyId)
                .Set(update => update.InGameStats, character.InGameStats);

            var partyFilter = Builders<Party>.Filter.Eq(filter => filter.Id, variables.CharacterId);
            var partyUpdate = Builders<Party>.Update.Push(update => update.InGameCharactersIds, variables.CharacterId);

            await _characterCollection.UpdateManyAsync(session, characterFilter, characterUpdate);
            await _partyCollection.UpdateManyAsync(session, partyFilter, partyUpdate);
            await session.CommitTransactionAsync();  
        }
        catch (Exception)
        {
            await session.AbortTransactionAsync();
        }
        //
        await _hubContext.Clients
            .Group(variables.PartyId.ToString())
            .OnPartyJoin(_mapper.Map<CharacterDto>(character));
        return UserPartyDto.FromPartyAndCharacterInfo(party, character.Id, character.Personality.Name);
    }
}
