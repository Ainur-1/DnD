using Contracts.Character;
using Contracts.Inventory;

namespace Contracts;

public record CharacterInventoryDto
{
    public WalletDto Wallet { get; init; } = new();

    public List<InventoryItemDto> Items { get; init; } = new();

    public float TotalWeightInPounds { get; init; }
}
