namespace Domain.Entities.Game.Races;

public record RaceTraitDescriptor : IValueObject
{
    public string Name { get; init; }

    public string Description { get; init; }

    public string[]? Options { get; init; }
}
