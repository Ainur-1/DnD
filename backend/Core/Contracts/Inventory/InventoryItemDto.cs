namespace Contracts.Inventory;

public record InventoryItemDto
{
    public Guid Id { get; init; }
    public int Count { get; init; }

    public bool InUse { get; init; }

    /// <summary>
    /// If character can use this item and take proficiency bonus 
    /// </summary>
    public bool IsItemProficiencyOn { get; init; }

    public OneOfItem Item { get; init; }
}
