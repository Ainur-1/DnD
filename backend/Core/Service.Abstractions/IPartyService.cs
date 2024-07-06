namespace Service.Abstractions;

public interface IPartyService
{
    public Task<bool> IsGameMasterAsync(Guid userId, Guid partyId);

    public Task DisbandPartyAsync(Guid partyId, int xp);
}
