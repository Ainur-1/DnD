using Contracts;
using Contracts.Character;
using Contracts.Online;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Service.Abstractions;

namespace Services.Implementation.LoggerDecarator;

public class CharacterWithLogDecorator : ServiceLoggerBase<ICharacterService>, ICharacterService
{
    private readonly ICharacterService _characterService;
    public CharacterWithLogDecorator(
        CharacterService characterService, 
        ILogger<ICharacterService> logger, 
        IHttpContextAccessor httpContext) : base(logger, httpContext)
    {
        _characterService = characterService;
    }

    public async Task<Guid> CreateCharacterAsync(Guid issuer, CreateCharacterDto character)
    {
        var task = _characterService.CreateCharacterAsync(issuer, character);
        await AwaitWithLogAsync(task, nameof(CreateCharacterAsync));
        return task.Result;
    }

    public async Task<GameCharacterDto> GetByIdAsync(Guid id, Guid partyId)
    {
        var task = _characterService.GetByIdAsync(id, partyId);
        await AwaitWithLogAsync(task, nameof(GetByIdAsync));
        return task.Result;
    }

    public async Task<(bool IsDead, int InitiativeModifier)?> GetCharacterFightOrderCalculationParametersAsync(Guid characterId)
    {
        var task = _characterService.GetCharacterFightOrderCalculationParametersAsync(characterId);
        await AwaitWithLogAsync(task, nameof(GetCharacterFightOrderCalculationParametersAsync));
        return task.Result;
    }

    public async Task<CharacterDto?> GetCharacterForUserAsync(Guid issuerId, Guid characterId)
    {
        var task = _characterService.GetCharacterForUserAsync(issuerId, characterId);
        await AwaitWithLogAsync(task, nameof(GetCharacterForUserAsync));
        return task.Result;
    }

    public async Task<IEnumerable<CharacterDto>> GetUserCharactersAsync(Guid userId)
    {
        var task = _characterService.GetUserCharactersAsync(userId);
        await AwaitWithLogAsync(task, nameof(GetUserCharactersAsync));
        return task.Result;
    }

    public async Task HealAsync(Guid issuerId, Guid characterId, int hpAddition, int tempHpAddition, int usedDiceCount)
    {
        var task = _characterService.HealAsync(issuerId, characterId, hpAddition, tempHpAddition, usedDiceCount);
        await AwaitWithLogAsync(task, nameof(GetUserCharactersAsync));
    }

    public async Task ResurrectAsync(Guid characterId)
    {
        var task = _characterService.ResurrectAsync(characterId);
        await AwaitWithLogAsync(task, nameof(GetUserCharactersAsync));
    }

    public async Task TakeDamageAsync(Guid characterId, int damage)
    {
        var task = _characterService.TakeDamageAsync(characterId, damage);
        await AwaitWithLogAsync(task, nameof(TakeDamageAsync));
    }

    public async Task UpdateCharacterInGameStatsAsync(Guid characterId, InGameStatsUpdateDto updateStats)
    {
        var task = _characterService.UpdateCharacterInGameStatsAsync(characterId, updateStats);
        await AwaitWithLogAsync(task, nameof(UpdateCharacterInGameStatsAsync));
    }

    public async Task UpdateDeathSavesAsync(Guid characterId, DeathSavesDto deathSaves)
    {
        var task = _characterService.UpdateDeathSavesAsync(characterId, deathSaves);
        await AwaitWithLogAsync(task, nameof(GetUserCharactersAsync));
    }
}
