using System.Collections.Concurrent;

namespace GameHub.Models;

public class GameRoomState
{

    private readonly ConcurrentDictionary //User > SuggestionId > Descpription
        <Guid, ConcurrentDictionary<Guid, InventoryItemSuggestion>> _userItemSuggestions = new();
    private int connectedPlayersCount = 0;
    public int ConnectedPlayersCount => connectedPlayersCount;
    public bool IsFight => SortedInitiativeScores != null;
    public (Guid CharacterId, int Score)[]? SortedInitiativeScores { get; set; }
    public Guid PartyId { get; set; }
    public GameRoomState(Guid partyId)
    {
        PartyId = partyId;
    }
    public void IncrementConnectedPlayers() => Interlocked.Increment(ref connectedPlayersCount);
    public void DecrementConnectedPlayers() => Interlocked.Decrement(ref connectedPlayersCount);
}
