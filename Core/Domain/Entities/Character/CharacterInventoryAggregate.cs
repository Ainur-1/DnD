using Domain.Entities.Items;

namespace Domain.Entities.Character;

public class CharacterInventoryAggregate
{
    public bool CurrencyWeightEmulationEnabled { get; set; }

    public CharacterCurrency Wallet { get; set; }

    public List<InventoryItem> Items { get; set; }

    public float TotalWeightInPounds => CurrencyWeightEmulationEnabled ? ItemsWeight + Wallet.TotalWeightInPounds : ItemsWeight;

    private float ItemsWeight => Items.Sum(x => x.Item.WeightInPounds);
}
