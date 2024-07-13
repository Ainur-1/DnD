using Contracts;
using Contracts.Character;
using Contracts.Online;
using Domain.Exceptions;

namespace Service.Abstractions;

public interface ICharacterService
{
    Task<Guid> CreateCharacterAsync(Guid issuer, CreateCharacterDto character);

    /// <exception cref="ObjectNotFoundException">if party or chracter does not exist</exception>
    Task<GameCharacterDto> GetByIdAsync(Guid id, Guid partyId);
    Task<(bool IsDead, int InitiativeModifier)?> GetCharacterFightOrderCalculationParametersAsync(Guid characterId);
    Task UpdateCharacterInGameStatsAsync(Guid characterId, InGameStatsUpdateDto updateStats);
    
    /// <exception cref="InvalidArgumentValueException">if damage is invalid</exception>
    /// <exception cref="ObjectNotFoundException">if character is not found</exception>
    Task TakeDamageAsync(Guid characterId, int damage);

    /// <summary>
    /// Should be used to retrieve Character information
    /// </summary>
    /// <param name="issuerId"></param>
    /// <param name="characterId"></param>
    /// <exception cref="AccessDeniedException">
    /// if character is private and issuer is not owner
    /// </exception>
    Task<CharacterDto?> GetCharacterForUserAsync(Guid issuerId,  Guid characterId);

    Task<IEnumerable<CharacterDto>> GetUserCharactersAsync(Guid userId);
}
