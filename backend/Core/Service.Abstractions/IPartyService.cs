using Contracts.Online;

namespace Service.Abstractions;

public interface IPartyService
{
    public Task<bool> IsGameMasterAsync(Guid userId, Guid partyId);
    public Task DisbandPartyAsync(Guid partyId, int xp);

    public Task<bool> IsUserInPartyAsync(Guid userId);
    public Task<IEnumerable<GameCharacterDto>> GetCharactersInfoAsync(Guid partyId);

}
