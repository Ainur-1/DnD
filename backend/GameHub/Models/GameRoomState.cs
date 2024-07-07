using System.Collections.Concurrent;
using Contracts.Online;

namespace GameHub.Models;

public class GameRoomState
{

    private readonly ConcurrentDictionary //User > SuggestionId > Descpription
        <Guid, ConcurrentDictionary<Guid, InventoryItemSuggestion>> _userItemSuggestions = new();
    public bool IsFight => SortedInitiativeScores != null;
    public (Guid CharacterId, int Score)[]? SortedInitiativeScores { get; set; }
    public Guid PartyId { get; set; }
    public GameRoomState(Guid partyId)
    {
        PartyId = partyId;
    }

}
