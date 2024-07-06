using Domain.Entities.Game.Items;
using Microsoft.AspNetCore.Identity;

namespace DnD.GraphQL.Types
{
    public class SignUpPayload
    {
        public SignUpPayload(IdentityResult result)
        {
            Errors = result.Errors.Select(e => e.Description).ToList();
            Succeeded = result.Succeeded;
        }

        public List<string> Errors { get; set; }
        public bool Succeeded { get; set; }
    }

    public class SignInPayload
    {
        public SignInPayload(List<string> errors)
        {
            Errors = errors;
            Token = null;
        }

        public SignInPayload(string token)
        {
            Errors = new List<string>();
            Token = token;
        }

        public List<string> Errors { get; set; }
        public string Token { get; set; }
    }

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
}