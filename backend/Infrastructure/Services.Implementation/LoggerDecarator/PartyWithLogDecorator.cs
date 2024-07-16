using Contracts.Online;
using Contracts.Parties;
using Domain.Entities.Parties;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Service.Abstractions;

namespace Services.Implementation.LoggerDecarator;

public class PartyWithLogDecorator : ServiceLoggerBase<IPartyService>, IPartyService
{
    private readonly IPartyService _partyService;
    public PartyWithLogDecorator(
        PartyService partyService,
        ILogger<IPartyService> logger, 
        IHttpContextAccessor httpContext) : base(logger, httpContext)
    {
        _partyService = partyService;
    }

    public async Task<Guid> CreatePartyAsync(Guid gameMasterId, string accessCode)
    {
        var task = _partyService.CreatePartyAsync(gameMasterId, accessCode);
        await AwaitWithLogAsync(task, nameof(CreatePartyAsync));
        return task.Result;
    }

    public async Task DisbandPartyAsync(Guid partyId, int xp)
    {
        var task = _partyService.DisbandPartyAsync(partyId, xp);
        await AwaitWithLogAsync(task, nameof(DisbandPartyAsync));
    }

    public async Task<IEnumerable<GameCharacterDto>> GetCharactersInfoAsync(Guid partyId)
    {
        var task = _partyService.GetCharactersInfoAsync(partyId);
        await AwaitWithLogAsync(task, nameof(GetCharactersInfoAsync));
        return task.Result;
    }

    public async Task<Party?> GetPartyByIdAsync(Guid partyId)
    {
        var task = _partyService.GetPartyByIdAsync(partyId);
        await AwaitWithLogAsync(task, nameof(GetPartyByIdAsync));
        return task.Result;
    }

    public async Task<IEnumerable<UserPartyDto>> GetUserPartiesAsync(Guid userId)
    {
        var task = _partyService.GetUserPartiesAsync(userId);
        await AwaitWithLogAsync(task, nameof(GetUserPartiesAsync));
        return task.Result;
    }

    public async Task<UserPartyDto> GetUserPartyAsync(Guid userId, Guid partyId)
    {
        var task = _partyService.GetUserPartyAsync(userId, partyId);
        await AwaitWithLogAsync(task, nameof(GetUserPartyAsync));
        return task.Result;
    }

    public async Task<bool> IsUserInPartyAsync(Guid userId, Guid partyId)
    {
        var task = _partyService.IsUserInPartyAsync(userId, partyId);
        await AwaitWithLogAsync(task, nameof(IsUserInPartyAsync));
        return task.Result;
    }

    public async Task<UserPartyDto> JoinPartyAsync(JoinPartyVariablesDto variables)
    {
        var task = _partyService.JoinPartyAsync(variables);
        await AwaitWithLogAsync(task, nameof(JoinPartyAsync));
        return task.Result;
    }
}
