using Domain.Entities.Game.Items;

namespace Domain.Entities.Character;

public class CharacterInventoryAggregate
{
    public bool CurrencyWeightEmulationEnabled { get; protected set; }

    public CharacterCurrency Wallet { get; protected set; }

    public List<InventoryItem> Items { get; protected set; } = new();

    public float TotalWeightInPounds => CurrencyWeightEmulationEnabled ? ItemsWeight + Wallet.TotalWeightInPounds : ItemsWeight;

    private float ItemsWeight => Items.Sum(x => x.Item.WeightInPounds);

    public CharacterInventoryAggregate(
        bool setCurrencyWeightEmulationOn,
        CharacterCurrency initialWallet,
        IEnumerable<InventoryItem>? initialItems
    ) {
        CurrencyWeightEmulationEnabled = setCurrencyWeightEmulationOn;

        ArgumentNullException.ThrowIfNull(initialWallet, nameof(initialWallet));
        ArgumentNullException.ThrowIfNull(initialItems, nameof(initialItems));
        
        Wallet = initialWallet;
        Items = initialItems?.ToList() ?? new(); 

    }

    protected CharacterInventoryAggregate() {}
}
