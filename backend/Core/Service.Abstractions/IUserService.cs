namespace Services.Abstractions;

public interface IUserService
{
    /// <exception cref="EmailTakenException"></exception>
    /// <exception cref="UsernameTakenException"></exception>
    /// <exception cref="InvalidArgumentValueException"
    Task CreateAsync(string email, string username, string password, string? name = default);
}
