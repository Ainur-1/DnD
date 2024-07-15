namespace Services.Abstractions;

public interface IUserService: IDomainService
{
    /// <exception cref="EmailTakenException"></exception>
    /// <exception cref="UsernameTakenException"></exception>
    /// <exception cref="InvalidArgumentValueException"
    Task CreateAsync(string email, string username, string password, string? name = default);
    Task TryConfirmEmailAsync(string userId, string token);
    Task SendPasswordResetCodeAsync(string email);
    Task ResetPasswordAsync(string email, string code, string newPassword);
    Task ChangePasswordAsync(string userId, string newPassword);

}
