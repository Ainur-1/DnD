﻿using AutoMapper;
using Contracts;
using Contracts.Online;
using Contracts.Parties;
using DataAccess.Extensions;
using Domain.Entities.Character;
using Domain.Entities.Parties;
using Domain.Entities.User;
using Domain.Exceptions;
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

    public PartyService(IMongoCollection<Party> partyCollection, 
        IMongoCollection<CharacterAggregate> characterCollection, 
        IMongoClient client, 
        IMapper mapper
        )
    {
        _partyCollection = partyCollection;
        _characterCollection = characterCollection;
        _client = client;
        _mapper = mapper;
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
                ValidExample = "XP должен быть не отрицательный"
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
                .Inc(xp => xp.Personality.Xp, gainedXp);

            await _characterCollection.UpdateManyAsync(session, filter, update);
            await _partyCollection.DeleteOneAsync(session, p => p.Id == partyId);
            await session.CommitTransactionAsync();
        }
        catch (Exception)
        {
            await session.AbortTransactionAsync();
        }

    }

    public async Task<IEnumerable<GameCharacterDto>> GetCharactersInfoAsync(Guid partyId)
    {
        var characterIdsOnlyProjection = Builders<Party>.Projection
            .Exclude(x => x.Id)
            .Exclude(x => x.GameMasterId)
            .Exclude(x => x.AccessCode)
            .Include(x => x.InGameCharactersIds);

        var charactersIds = (await _partyCollection
            .GetParty(partyId)
            .Project<Party>(characterIdsOnlyProjection)
            .SingleOrDefaultAsync())
            ?.InGameCharactersIds ?? throw new ObjectNotFoundException();

        var characterFilter = Builders<CharacterAggregate>.Filter
            .In(c => c.Id, charactersIds);

        var characters = await _characterCollection
            .Find(characterFilter)
            .ToListAsync();

        return characters
            .Select(_mapper.Map<GameCharacterDto>)
            .ToArray();
    }

    public Task<Party?> GetPartyByIdAsync(Guid partyId)
    {
        return _partyCollection.Find(x => x.Id == partyId).
            FirstOrDefaultAsync()!;
    }

    public async Task<IEnumerable<UserPartyDto>> GetUserPartiesAsync(Guid userId)
    {
        var result = new ConcurrentBag<UserPartyDto>();

        var fetchTask = _characterCollection
            .Find(x => x.Info.OwnerId == userId && x.Info.JoinedPartyId != null)
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
            .Find(x => x.Info.OwnerId == userId && x.Info.JoinedPartyId == partyId)
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
        return await _characterCollection
            .Find(x => x.Info.OwnerId == userId && x.Info.JoinedPartyId == partyId)
            .AnyAsync();
    }

    public async Task<UserPartyDto> JoinPartyAsync(JoinPartyVariablesDto variables)
    {
        var party = await _partyCollection.Find(p => p.Id == variables.PartyId).FirstOrDefaultAsync();
        
        if (party == null) throw new ObjectNotFoundException();

        if (variables.UserId == party.GameMasterId)
        {
            throw new AccessDeniedException();
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

        using var session = await _client.StartSessionAsync();
        session.StartTransaction();
        try
        {
            var characterFilter = Builders<CharacterAggregate>.Filter.Eq(filter => filter.Id, variables.CharacterId);
            var characterUpdate = Builders<CharacterAggregate>.Update
                .Set(update => update.Info.JoinedPartyId, variables.PartyId);

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
        party.AddCharacter(character.Id);
        return UserPartyDto.FromPartyAndCharacterInfo(party, character.Id, character.Personality.Name);
    }
}
