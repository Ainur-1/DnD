using Contracts.Online;
using Contracts.Parties;
using Domain.Entities.Parties;
using Services.Abstractions;

namespace Service.Abstractions;

public interface IPartyService: IDomainService
{
    Task<Party?> GetPartyByIdAsync(Guid partyId);

    Task DisbandPartyAsync(Guid partyId, int xp);

    Task<bool> IsUserInPartyAsync(Guid userId, Guid partyId);

    Task<IEnumerable<GameCharacterDto>> GetCharactersInfoAsync(Guid partyId);

    Task<UserPartyDto> GetUserPartyAsync(Guid userId, Guid partyId);

    Task<IEnumerable<UserPartyDto>> GetUserPartiesAsync(Guid userId);

    /// <exception cref="AccessDeniedException">On unauthorized request</exception>
    Task<Guid> CreatePartyAsync(Guid gameMasterId, string accessCode);

    Task<UserPartyDto> JoinPartyAsync(JoinPartyVariablesDto variables);
}
