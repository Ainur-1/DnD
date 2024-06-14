
namespace Domain.Entities.Items;

public abstract class Item
{
    public string Name { get; protected set; }

    public float WeightInPounds { get; protected set; }

    public string? Description { get; protected set; }

    public decimal CostInGold { get; protected set; }

    public string[] Tags { get; protected set; } = Array.Empty<string>();
}
