using Contracts.Online;
using Domain.Entities.Parties;

namespace Service.Abstractions;

public interface IPartyService
{
    public Task<Party?> GetPartyByIdAsync(Guid partyId);
    public Task DisbandPartyAsync(Guid partyId, int xp);
    public Task<bool> IsUserInPartyAsync(Guid userId, Guid partyId);
    public Task<IEnumerable<GameCharacterDto>> GetCharactersInfoAsync(Guid partyId);
}
