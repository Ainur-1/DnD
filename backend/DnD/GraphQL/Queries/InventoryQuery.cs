using Contracts;
using DnD.GraphQL.Extensions;
using HotChocolate.Authorization;
using Service.Abstractions;

namespace DnD.GraphQL.Queries;

[ExtendObjectType("Query")]
[Authorize]
public class InventoryQuery
{
    public async Task<CharacterInventoryDto> GetCharacterInventoryAsync(
        [Service] IInventoryService inventoryService,
        [Service] IHttpContextAccessor httpContextAccessor,
        Guid characterId)
    {
        var issuerId = httpContextAccessor.GetUserIdOrThrowAccessDenied();

        return await inventoryService.GetCharacterInventoryAsync(issuerId, characterId);
    }
}
