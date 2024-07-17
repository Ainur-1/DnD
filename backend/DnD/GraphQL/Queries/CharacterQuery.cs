using HotChocolate.Authorization;
using Contracts;
using Service.Abstractions;
using Domain.Exceptions;
using DnD.GraphQL.Extensions;
using HotChocolate.Data;

namespace DnD.GraphQL.Queries;

[Authorize]
[ExtendObjectType("Query")]
public class CharacterQuery
{
    [Error(typeof(AccessDeniedException))]
    [Error(typeof(ObjectNotFoundException))]
    public async Task<CharacterDto> GetCharacterAsync([Service] ICharacterService characterService, [Service] IHttpContextAccessor contextAccessor, Guid characterId)
    {
        var currentUserId = contextAccessor.GetUserIdOrThrowAccessDenied();

        try
        {
            return await characterService.GetCharacterForUserAsync(currentUserId, characterId) ?? throw new ObjectNotFoundException();
        }
        catch(AccessDeniedException)
        {
            throw new ObjectNotFoundException();
        }
    }

    [UseFiltering]
    public async Task<IEnumerable<CharacterDto>> GetMyCharacters([Service] ICharacterService characterService, [Service] IHttpContextAccessor contextAccessor)
    {
        var currentUserId = contextAccessor.GetUserIdOrThrowAccessDenied();

        return await characterService.GetUserCharactersAsync(currentUserId);
    }
}
