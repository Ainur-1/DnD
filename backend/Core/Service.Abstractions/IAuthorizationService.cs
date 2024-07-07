namespace Services.Abstractions;

public interface IAuthorizationService
{
    Task<bool> SignInAsync(string usernameOrEmail, string password, bool persist);

    Task<bool> SignOutAsync();
}
