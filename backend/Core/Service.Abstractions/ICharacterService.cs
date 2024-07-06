using Contracts.Online;

namespace Service.Abstractions;

public interface ICharacterService
{
    public Task<GameCharacterDto> GetByIdAsync(Guid id, Guid partyId);
    public Task<DynamicStatsDto> GetCharacterInGameStatsAsync(Guid characterId);
    public Task UpdateCharacterInGameStatsAsync(Guid characterId, DynamicStatsDto updateStats);
    public Task TakeDamageAsync(Guid characterId, int damage);
}
