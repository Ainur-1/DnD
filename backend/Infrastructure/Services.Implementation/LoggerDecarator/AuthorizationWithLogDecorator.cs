using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Services.Abstractions;

namespace Services.Implementation.LoggerDecarator;

public class AuthorizationWithLogDecorator : ServiceLoggerBase<IAuthorizationService>, IAuthorizationService
{
    private readonly IAuthorizationService _userManagementService;
    public AuthorizationWithLogDecorator(
        UserManagementService userManagementService, 
        ILogger<IAuthorizationService> logger, 
        IHttpContextAccessor httpContextAccessor) : base(logger, httpContextAccessor)
    {
        _userManagementService = userManagementService;
    }
    public async Task<Guid?> SignInAsync(string usernameOrEmail, string password, bool persist)
    {
        var task = _userManagementService.SignInAsync(usernameOrEmail, password, persist);
        await AwaitWithLogAsync(task, nameof(SignInAsync));
        return task.Result;
    }
    public async Task<bool> SignOutAsync()
    {
        var task = _userManagementService.SignOutAsync();
        await AwaitWithLogAsync(task, nameof(SignOutAsync));
        return task.Result;
    }
}
