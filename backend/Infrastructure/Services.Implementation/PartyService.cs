using Service.Abstractions;

namespace Services.Implementation;

public class PartyService : IPartyService
{
    public Task DisbandPartyAsync(Guid partyId, int xp)
    {
        throw new NotImplementedException();
    }

    public Task<bool> IsGameMasterAsync(Guid userId, Guid partyId)
    {
        throw new NotImplementedException();
    }
}
