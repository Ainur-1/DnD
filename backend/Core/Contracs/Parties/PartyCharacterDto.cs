namespace Contracts.Parties;

public record PartyCharacterDto
{
    public Guid Id { get; init; }

    public string CharacterName { get; init; } = "";
}
