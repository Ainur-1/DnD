namespace Contracts;

public record CharacterDto
{
    public Guid Id { get; init; }

    public CharacterPersonalityDto Personality { get; init; }

    public DynamicStatsDto DynamicStats { get; init; }

    public bool IsInParty { get; init; }
}
