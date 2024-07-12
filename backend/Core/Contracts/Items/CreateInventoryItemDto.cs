using Domain.Entities.Game.Items;

namespace Contracts.Items;

public record CreateInventoryItemDto
{
    public int Count { get; init; }

    public bool InUse { get; init;  }

    /// <summary>
    /// If character can use this item and take proficiency bonus 
    /// </summary>
    public bool IsItemProficiencyOn { get; init; }

    //public Item Item { get; init; }
}
