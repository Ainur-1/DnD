using System.ComponentModel;

namespace Domain.Entities.Game.Items;

public class InventoryItem
{
    public Guid Id { get; protected set; }
    public int Count { get; protected set; }

    public bool InUse { get; internal set; }

    /// <summary>
    /// If character can use this item and take proficiency bonus 
    /// </summary>
    public bool IsItemProficiencyOn { get; internal set; }

    public Item Item { get; protected set; }

    public InventoryItem(bool initialItemUse, bool initialItemProficiency, int count, Item source) 
    {
        Id = Guid.NewGuid();

        ArgumentNullException.ThrowIfNull(source, nameof(source));
        Item = source;

        InUse = initialItemUse;
        IsItemProficiencyOn = initialItemProficiency;
        SetCount(count);
    }

    protected InventoryItem() {}

    public void SetCount(int count) 
    {
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(count, nameof(count));
        Count = count;
    }
}
