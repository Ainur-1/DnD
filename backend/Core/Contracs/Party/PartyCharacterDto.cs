namespace Contracts.Party;

public record PartyCharacterDto
{
    public Guid Id { get; init; }

    public string CharacterName { get; init; } = "";
}
