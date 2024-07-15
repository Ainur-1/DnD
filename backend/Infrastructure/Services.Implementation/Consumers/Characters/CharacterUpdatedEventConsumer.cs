using AutoMapper;
using Contracts;
using DataAccess.Extensions;
using Domain.Entities.Characters;
using GameHub;
using MassTransit;
using Microsoft.AspNetCore.SignalR;
using MongoDB.Driver;
using GameHubCHaracterUpdatedEvent = GameHub.Dtos.CharacterUpdatedEvent;

namespace Services.Implementation.Consumers.Characters;

internal class CharacterUpdatedEventConsumer : IConsumer<CharacterUpdatedEvent>
{
    private readonly IMongoCollection<Character> _characters;
    private readonly IHubContext<GameHub.GameHub, IHubEventActions> _gameHub;

    private readonly IMapper _mapper;

    public CharacterUpdatedEventConsumer(
        IMongoCollection<Character> characters,
        IHubContext<GameHub.GameHub, IHubEventActions> hubContext,
        IMapper mapper
        )
    {
        _gameHub = hubContext;
        _characters = characters;
        _mapper = mapper;
    }

    public async Task Consume(ConsumeContext<CharacterUpdatedEvent> context)
    {
        var updatedCharacterId = context.Message.Id;

        var updatedCharacter = await _characters
            .FindById(updatedCharacterId)
            .FirstOrDefaultAsync();

        if (updatedCharacter != null && updatedCharacter.Info.JoinedPartyId != default)
        {
            await _gameHub
                .Clients
                .Group(updatedCharacter.Info.JoinedPartyId.ToString())
                .OnCharacterUpdate(new GameHubCHaracterUpdatedEvent 
                {
                    Id = updatedCharacterId,
                    Stats = _mapper.Map<DynamicStatsDto>(updatedCharacter),
                });
        }
    }
}
