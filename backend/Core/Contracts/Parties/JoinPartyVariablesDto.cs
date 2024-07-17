namespace Contracts.Parties;

public record JoinPartyVariablesDto
{
    public Guid UserId { get; init; }

    public Guid PartyId { get; init; }

    public Guid CharacterId { get; init; }

    public string AccessCode { get; init; } = "";

    public bool AreValid()
    {
        return GuidIsNotEmpty(UserId)
            && GuidIsNotEmpty(PartyId)
            && GuidIsNotEmpty(CharacterId)
            && !string.IsNullOrEmpty(AccessCode);
    }

    private bool GuidIsNotEmpty(Guid id) => id != Guid.Empty;
}
