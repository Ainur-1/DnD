namespace Contracts.Party;

public record UserPartyDto
{
    public Guid Id { get; init; }

    public Guid GameMasterId { get; init; }

    public List<Guid> InGameCharactersIds { get; init; }

    public string AccessCode { get; init; }

    public PartyCharacterDto? InGameCharacter { get; init; }
}
