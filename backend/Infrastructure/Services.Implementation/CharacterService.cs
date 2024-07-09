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

    public Task<(bool IsDead, int InitiativeModifier)?> GetCharacterFightOrderCalculationParametersAsync(Guid characterId)
    {
        throw new NotImplementedException();
    }

    public Task<CharacterDto?> GetCharacterForUserAsync(Guid issuerId, Guid characterId)
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

    public Task UpdateCharacterInGameStatsAsync(Guid characterId, InGameStatsUpdateDto updateStats)
    {
        throw new NotImplementedException();
    }
}
