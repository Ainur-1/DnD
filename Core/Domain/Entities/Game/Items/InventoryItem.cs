using Domain.Entities.Items;

namespace Domain.Entities.Game.Items;

public class InventoryItem
{
    //todo: если postgresql, то тут должен быть внешний ключ на персонажа

    public int Count { get; protected set; }

    public bool InUse { get; protected set; }

    /// <summary>
    /// If character can use this item and take proficiency bonus 
    /// </summary>
    public bool IsItemProficiencyOn { get; protected set; }

    //todo: пока оставил виртуальным (навигационным полем для EF, но поидее если монго, то это обычное поле, для постгреса надо думать как хранить данные, либо грузить их с разных таблиц и сохранять тоже в разные)
    public virtual Item Item { get; protected set; }
}
