namespace Domain.Entities.Game.Items;

public record Item : IValueObject
{
    public string Name { get; init; }

    public string? IconUrl { get; init; }

    public float WeightInPounds { get; init; }

    public string? Description { get; init; }

    public decimal CostInGold { get; init; }

    public string[] Tags { get; init; } = Array.Empty<string>();
}
