using Domain.Entities.Game.Items;

namespace DnD.GraphQL.Types;

public class UpdateInventoryItemPayload
{
    public UpdateInventoryItemPayload(List<string> errors)
    {
        Errors = errors;
        Inventory = null;
    }

    public UpdateInventoryItemPayload(List<InventoryItem> inventory)
    {
        Errors = new List<string>();
        Inventory = inventory;
    }

    public List<string> Errors { get; set; }
    public List<InventoryItem> Inventory { get; set; }
}

public class InventoryItemInput
{
    public string Id { get; set; }
    public int Count { get; set; }
    public bool InUse { get; set; }
    public bool ProficiencyOn { get; set; }
}