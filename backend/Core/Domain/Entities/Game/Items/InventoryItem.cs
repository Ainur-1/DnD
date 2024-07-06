namespace Domain.Entities.Game.Items;

public class InventoryItem
{
    public Guid Id { get; set; }
    public int Count { get; protected set; }

    public bool InUse { get; protected set; }

    /// <summary>
    /// If character can use this item and take proficiency bonus 
    /// </summary>
    public bool IsItemProficiencyOn { get; protected set; }

    public Item Item { get; protected set; }
}
