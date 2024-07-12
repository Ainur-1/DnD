using Contracts.Parties;
using DnD.GraphQL.Extensions;
using HotChocolate.Authorization;
using Service.Abstractions;
using static Domain.Exceptions.PartyExceptions;

namespace DnD.GraphQL.Mutations;

[ExtendObjectType("Mutation")]
[Authorize]
public class PartyMutation
{
    //todo: error handlers
    
    public async Task<Guid> CreatePartyAsync([Service] IPartyService partyService, [Service] IHttpContextAccessor httpContextAccessor, string accessCode)
    {
        var creatorId = httpContextAccessor.GetUserIdOrThrowAccessDenied();
        try
        {
            return await partyService.CreatePartyAsync(creatorId, accessCode);
        }
        catch (PartyAlreadyExistsException ex)
        {
            throw new GraphQLException(new ErrorBuilder()
                .SetMessage("A party with this access code already exists.")
                .SetCode("PARTY_ALREADY_EXISTS")
                .Build());
        }
        catch (Exception ex)
        {
            throw new GraphQLException(new ErrorBuilder()
                .SetMessage("An unexpected error occurred while creating the party.")
                .SetCode("UNEXPECTED_ERROR")
                .Build());
        }
        //return await partyService.CreatePartyAsync(creatorId, accessCode);
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
        try
        {
            return await partyService.JoinPartyAsync(variables);
        }
        catch (PartyNotFoundException ex)
        {
            throw new GraphQLException(new ErrorBuilder()
                .SetMessage("The party with the specified ID was not found.")
                .SetCode("PARTY_NOT_FOUND")
                .Build());
        }
        catch (InvalidAccessCodeException ex)
        {
            throw new GraphQLException(new ErrorBuilder()
                .SetMessage("The provided access code is invalid.")
                .SetCode("INVALID_ACCESS_CODE")
                .Build());
        }
        catch (Exception ex)
        {
            throw new GraphQLException(new ErrorBuilder()
                .SetMessage("An unexpected error occurred while joining the party.")
                .SetCode("UNEXPECTED_ERROR")
                .Build());
        }
        //return await partyService.JoinPartyAsync(variables);
    }
}
