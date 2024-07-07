using Domain.Exceptions;

namespace Domain.Exceptions;

public class UsernameTakenException : DomainException
{
    public UsernameTakenException(string username) : base()
    {
        Username = username;
    }

    public string Username { get; }
}
