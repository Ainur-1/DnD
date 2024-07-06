

using Contracs.Online;

namespace Service.Abstractions.Interface;

public interface ICharacterService
{
    public Task<GameCharacterDto> GetByIdAsync(Guid id);
    public Task<DinymicStatsDto> GetCharacterInGameStatsAsync(Guid characterId);
    public Task UpdateCharacterInGameStatsAsync(Guid characterId, DinymicStatsDto updatestats);
}

