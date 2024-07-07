using Domain.Exceptions;

namespace Domain.Exceptions;

public class EmailTakenException : DomainException
{
    public EmailTakenException(string email) : base()
    {
        Email = email;
    }

    public string Email { get; }
}
