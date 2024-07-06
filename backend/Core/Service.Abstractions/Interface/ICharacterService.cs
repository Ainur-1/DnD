

using Contracs.Online;

namespace Service.Abstractions.Interface;

public interface ICharacterService
{
    public Task<GameCharacterDto> GetByIdAsync(Guid id, Guid partyId);
    public Task<DinymicStatsDto> GetCharacterInGameStatsAsync(Guid characterId);
    public Task UpdateCharacterInGameStatsAsync(Guid characterId, DinymicStatsDto updatestats);
    public Task TakeDamageAsync(Guid characterId, int damage);
}

