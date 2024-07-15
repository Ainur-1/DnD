namespace Services.Abstractions;

public interface IAuthorizationService: IDomainService
{

    Task<Guid?> SignInAsync(string usernameOrEmail, string password, bool persist);
    Task<bool> SignOutAsync();

}
