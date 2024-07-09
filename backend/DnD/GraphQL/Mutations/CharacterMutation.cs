using HotChocolate.Authorization;
using Service.Abstractions;

namespace DnD.GraphQL.Mutations;

[ExtendObjectType("Mutation")]
[Authorize]
public class CharacterMutation
{

    public Task<Guid> CreateCharacter([Service] ICharacterService characterService, [Service] IHttpContextAccessor contextAccessor)
    {
        throw new NotImplementedException();
    }
}
