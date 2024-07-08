using Contracts.Online;
using Contracts.Parties;
using Domain.Entities.Parties;

namespace Service.Abstractions;

public interface IPartyService
{
    Task<Party?> GetPartyByIdAsync(Guid partyId);

    Task DisbandPartyAsync(Guid partyId, int xp);

    Task<bool> IsUserInPartyAsync(Guid userId, Guid partyId);

    Task<IEnumerable<GameCharacterDto>> GetCharactersInfoAsync(Guid partyId);

    Task<UserPartyDto> GetUserPartyAsync(Guid userId, Guid partyId);

    Task<IEnumerable<UserPartyDto>> GetUserPartiesAsync(Guid userId);

    Task<Guid> CreatePartyAsync(Guid gameMasterId, string accessCode);

    Task<UserPartyDto> JoinPartyAsync(JoinPartyVariablesDto variables);
}
