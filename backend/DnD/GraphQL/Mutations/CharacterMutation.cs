using Contracts.Character;
using DnD.GraphQL.Extensions;
using HotChocolate.Authorization;
using Service.Abstractions;

namespace DnD.GraphQL.Mutations;

[Authorize]
[ExtendObjectType("Mutation")]
public class CharacterMutation
{
    public async Task<Guid> CreateCharacterAsync(
        [Service] ICharacterService characterService, 
        [Service] IHttpContextAccessor contextAccessor,
        CreateCharacterDto character)
    {
        var currentUserId = contextAccessor.GetUserIdOrThrowAccessDenied();
        return await characterService.CreateCharacterAsync(currentUserId, character);
    }
}
