using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Services.Abstractions;

namespace Services.Implementation.LoggerDecarator;

public class UserWithLogDecorator : ServiceLoggerBase<IUserService>, IUserService
{
    private readonly IUserService _userService;
    public UserWithLogDecorator(
        UserManagementService userService,
        ILogger<IUserService> logger, 
        IHttpContextAccessor httpContext) : base(logger, httpContext)
    {
        _userService = userService;
    }

    public async Task ChangePasswordAsync(string userId, string newPassword)
    {
        var task = _userService.ChangePasswordAsync(userId, newPassword);
        await AwaitWithLogAsync(task, nameof(ChangePasswordAsync));
    }

    public async Task CreateAsync(string email, string username, string password, string? name = null)
    {
        var task = _userService.CreateAsync(email, username, password, name);
        await AwaitWithLogAsync(task, nameof(CreateAsync));
    }

    public async Task ResetPasswordAsync(string email, string code, string newPassword)
    {
        var task = _userService.ResetPasswordAsync(email, code, newPassword);
        await AwaitWithLogAsync(task, nameof(ResetPasswordAsync));
    }

    public async Task SendPasswordResetCodeAsync(string email)
    {
        var task = _userService.SendPasswordResetCodeAsync(email);
        await AwaitWithLogAsync(task, nameof(SendPasswordResetCodeAsync));
    }

    public async Task TryConfirmEmailAsync(string userId, string token)
    {
        var task = _userService.TryConfirmEmailAsync(userId, token);
        await AwaitWithLogAsync(task, nameof(TryConfirmEmailAsync));
    }
}
