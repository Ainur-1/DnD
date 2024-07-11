using AutoMapper;
using Contracts;
using Contracts.Online;
using Domain.Entities.Character;
using Domain.Entities.Parties;
using Domain.Exceptions;
using MongoDB.Driver;
using Service.Abstractions;
using DataAccess.Extensions;
using Domain.Entities.User;
using System.Security.Policy;
using GameHub;
using Microsoft.AspNetCore.SignalR;
using GameHub.Dtos;

namespace Services.Implementation;

public class CharacterService : ICharacterService
{
    private readonly IMongoCollection<Party> _partyCollection;
    private readonly IMongoCollection<CharacterAggregate> _characterCollection;
    private readonly IMongoClient _client;
    private readonly IMapper _mapper;
    private readonly IHubContext<GameHub.GameHub, IHubEventActions> _hubContext;

    public CharacterService(IMongoCollection<Party> partyCollection,
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

    public async Task<GameCharacterDto> GetByIdAsync(Guid userId, Guid partyId)
    {
        var party = await _partyCollection
            .FindById(partyId)
            .SingleOrDefaultAsync() 
            ?? throw new ObjectNotFoundException();

        var character = await _characterCollection
            .Find(x => x.Info.OwnerId == userId && x.Info.JoinedPartyId != null)
            .SingleOrDefaultAsync()
            ?? throw new ObjectNotFoundException();
        
        return _mapper.Map<GameCharacterDto>(character);
        //return character.Id; //нужно ли возвращать чарактердто??

    }

    public async Task<(bool IsDead, int InitiativeModifier)?> GetCharacterFightOrderCalculationParametersAsync(Guid characterId)
    {//
        var character = await _characterCollection
            .Find(c => c.Id == characterId)
            .SingleOrDefaultAsync() 
            ?? throw new ObjectNotFoundException();

        var isDead = character.Info.IsDead;
        var initiativeModifier = character.Stats.InitiativeModifier;
        return (isDead, initiativeModifier);
    }

    public async Task<CharacterDto?> GetCharacterForUserAsync(Guid userId, Guid characterId)
    {
        var character = await _characterCollection
            .Find(c => c.Id == characterId)
            .SingleOrDefaultAsync() 
            ?? throw new ObjectNotFoundException();
        //
        var characterDto = new CharacterDto
        {
            Id = character.Id,
            Personality = new CharacterPersonalityDto
            {
                
            },
            DynamicStats = new DynamicStatsDto
            {
               
            },
            IsInParty = character.Info.JoinedPartyId.HasValue
        };

        return characterDto;
    }

    public Task<IEnumerable<CharacterDto>> GetUserCharactersAsync(Guid userId)
    {
        //
        throw new NotImplementedException();
    }

    public async Task TakeDamageAsync(Guid characterId, int damage)
    {//
        if (damage < 0)
        {
            throw new InvalidArgumentValueException(nameof(damage))
            {
                InvalidValue = damage,
                ValidExample = "Урон должен быть не отрицательным"
            };
        }

        using var session = await _client.StartSessionAsync();
        session.StartTransaction();
        try
        {//
            var notDeadCharacter = await _characterCollection
                .Find(filter => filter.Id == characterId && !filter.Info.IsDead)
                .SingleOrDefaultAsync();
            
            var newHitPoints = notDeadCharacter.InGameStats.HitPoints - damage;
            if (newHitPoints < 0)
            {
                newHitPoints = 0;
            }

            var filter = Builders<CharacterAggregate>.Filter.Eq(c => c.Id, characterId);
            var update = Builders<CharacterAggregate>.Update
                .Set(hitpoint => hitpoint.InGameStats.HitPoints, newHitPoints)
                .Set(hitpoint => hitpoint.Info.IsDead, notDeadCharacter.InGameStats.HitPoints < 0);

            await _characterCollection.UpdateOneAsync(session, filter, update);
            await session.CommitTransactionAsync();
        }
        catch (Exception)
        {
            await session.AbortTransactionAsync();
        }
    }

    public async Task UpdateCharacterInGameStatsAsync(Guid characterId, InGameStatsUpdateDto updateStats)
    {

        using var session = await _client.StartSessionAsync();
        session.StartTransaction();
        try
        {   
            var filter = Builders<CharacterAggregate>.Filter.Eq(c => c.Id, characterId);

            var update = Builders<CharacterAggregate>.Update
                .Set(c => c.InGameStats.HitPoints, updateStats.Hp)
                .Set(c => c.InGameStats.TemporaryHitPoints, updateStats.TempHp)
                .Set(c => c.InGameStats.InspirationBonus, updateStats.Inspiration)
                .Set(c => c.InGameStats.ActualSpeed, updateStats.Speed)
                .Set(c => c.InGameStats.HitDicesLeft, updateStats.HitDicesLeftCount)
                .Set(c => c.InGameStats.IsDying, updateStats.IsDying)
                .Set(c => c.InGameStats.DeathSavesSuccessCount, updateStats.DeathSaves.SuccessCount)
                .Set(c => c.InGameStats.DeathSavesFailureCount, updateStats.DeathSaves.FailureCount);

            //var update = Builders<DynamicStatsDto>.Update
            //    .Set(c => c.Hp, updateStats.Hp)
            //    .Set(c => c.TempHp, updateStats.TempHp)
            //    .Set(c => c.Inspiration, updateStats.Inspiration)
            //    .Set(c => c.Speed, updateStats.Speed)
            //    .Set(c => c.HitDicesLeftCount, updateStats.HitDicesLeftCount)
            //    .Set(c => c.IsDying, updateStats.IsDying)
            //    .Set(c => c.IsDead, updateStats.IsDead)
            //    .Set(c => c.DeathSaves.SuccessCount, updateStats.DeathSaves.SuccessCount)
            //    .Set(c => c.DeathSaves.FailureCount, updateStats.DeathSaves.FailureCount);

            await _characterCollection.UpdateOneAsync(session, filter, update);
            await session.CommitTransactionAsync();
        }

        catch (Exception)
        {
            await session.AbortTransactionAsync();
        }
        var characterUpdatedEvent = new CharacterUpdatedEvent
        {
            Id = characterId,
            Stats = new DynamicStatsDto
            {
                
            }
        };
        var partyId = _partyCollection.Find(x => x.InGameCharactersIds.Contains(characterId)); //
        await _hubContext.Clients.Group(partyId.ToString()).OnCharacterUpdate(characterUpdatedEvent);

    }
}
