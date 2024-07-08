using Contracts.Party;
using DnD.GraphQL.Extensions;
using HotChocolate.Authorization;
using Service.Abstractions;

namespace DnD.GraphQL.Mutations;

[ExtendObjectType("Mutation")]
[Authorize]
public class PartyMutation
{
    //todo: error handlers
    
    public async Task<Guid> CreatePartyAsync([Service] IPartyService partyService, [Service] IHttpContextAccessor httpContextAccessor, string accessCode)
    {
        var creatorId = httpContextAccessor.GetUserIdOrThrowAccessDenied();

        return await partyService.CreatePartyAsync(creatorId, accessCode);
    }

    //todo: error handlers

    public async Task<UserPartyDto> JoinPartyAsync([Service] IPartyService partyService, [Service] IHttpContextAccessor httpContextAccessor,
        Guid partyId, Guid characterId, string accessCode)
    {
        var variables = new JoinPartyVariablesDto
        {
            AccessCode = accessCode,
            CharacterId = characterId,
            PartyId = partyId,
            UserId = httpContextAccessor.GetUserIdOrThrowAccessDenied()
        };

        return await partyService.JoinPartyAsync(variables);
    }
}
