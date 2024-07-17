using Contracts.Parties;
using DnD.GraphQL.Extensions;
using Domain.Entities.Parties;
using Domain.Exceptions;
using HotChocolate.Authorization;
using Service.Abstractions;

namespace DnD.GraphQL.Queries;

[ExtendObjectType("Query")]
[Authorize]
public class PartyQuery
{
    [Error(typeof(ObjectNotFoundException))]
    [Error(typeof(AccessDeniedException))]
    //todo: handle service errors
    public async Task<UserPartyDto> GetPartyAsync([Service] IPartyService partyService, [Service] IHttpContextAccessor contextAccessor, Guid partyId)
    {
        var currentUserId = contextAccessor.GetUserIdOrThrowAccessDenied();
        if (!await partyService.IsUserInPartyAsync(currentUserId, partyId))
        {
            throw new AccessDeniedException();
        }

        var party = await partyService.GetUserPartyAsync(currentUserId, partyId);
        if (party is null)
        {
            throw new ObjectNotFoundException();
        }

        return party;
    }

    //todo: handle service errors
    public async Task<IEnumerable<UserPartyDto>> GetMyPartiesAsync([Service] IPartyService partyService, [Service] IHttpContextAccessor contextAccessor)
    {
        var currentUserId = contextAccessor.GetUserIdOrThrowAccessDenied();

        return await partyService.GetUserPartiesAsync(currentUserId);
    }
}
