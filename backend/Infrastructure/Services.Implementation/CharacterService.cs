using Contracts;
using Contracts.Online;
using Service.Abstractions;

namespace Services.Implementation;

public class CharacterService : ICharacterService
{
    public Task<GameCharacterDto> GetByIdAsync(Guid id, Guid partyId)
    {
        throw new NotImplementedException();
    }

    public Task<CharacterDto?> GetCharacterForUserAsync(Guid issuerId, Guid characterId)
    {
        throw new NotImplementedException();
    }

    public Task<DynamicStatsDto> GetCharacterInGameStatsAsync(Guid characterId)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<CharacterDto>> GetUserCharactersAsync(Guid userId)
    {
        throw new NotImplementedException();
    }

    public Task TakeDamageAsync(Guid characterId, int damage)
    {
        throw new NotImplementedException();
    }

    public Task UpdateCharacterInGameStatsAsync(Guid characterId, DynamicStatsDto updateStats)
    {
        throw new NotImplementedException();
    }
}
