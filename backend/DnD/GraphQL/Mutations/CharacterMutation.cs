using Contracts.Character;
using DnD.GraphQL.Extensions;
using Domain.Exceptions;
using HotChocolate.Authorization;
using Service.Abstractions;

namespace DnD.GraphQL.Mutations;

[Authorize]
[ExtendObjectType("Mutation")]
public class CharacterMutation
{

    [Error(typeof(InvalidArgumentValueException))]
    public async Task<Guid> CreateCharacterAsync(
        [Service] ICharacterService characterService, 
        [Service] IHttpContextAccessor contextAccessor,
        CreateCharacterDto character)
    {
        try
        {

            var currentUserId = contextAccessor.GetUserIdOrThrowAccessDenied();
            return await characterService.CreateCharacterAsync(currentUserId, character);
        }
        catch(Exception ex)
        {
            throw ex;
        }
    }
}
