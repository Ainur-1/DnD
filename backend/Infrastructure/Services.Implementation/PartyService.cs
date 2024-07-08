using Contracts.Online;
using Contracts.Party;
using Domain.Entities.Parties;
using Service.Abstractions;

namespace Services.Implementation;

public class PartyService : IPartyService
{
    public Task<Guid> CreatePartyAsync(Guid gameMasterId, string accessCode)
    {
        throw new NotImplementedException();
    }

    public Task DisbandPartyAsync(Guid partyId, int xp)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<GameCharacterDto>> GetCharactersInfoAsync(Guid partyId)
    {
        throw new NotImplementedException();
    }

    public Task<Party?> GetPartyByIdAsync(Guid partyId)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<UserPartyDto>> GetUserPartiesAsync(Guid userId)
    {
        throw new NotImplementedException();
    }

    public Task<UserPartyDto> GetUserPartyAsync(Guid userId, Guid partyId)
    {
        throw new NotImplementedException();
    }

    public Task<bool> IsGameMasterAsync(Guid userId, Guid partyId)
    {

        throw new NotImplementedException();
    }

    public Task<bool> IsUserInPartyAsync(Guid userId, Guid partyId)
    {
        throw new NotImplementedException();
    }

    public Task<UserPartyDto> JoinPartyAsync(JoinPartyVariablesDto variables)
    {
        throw new NotImplementedException();
    }
}
