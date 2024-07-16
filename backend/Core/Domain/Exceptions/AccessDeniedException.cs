namespace Domain.Exceptions;

public class AccessDeniedException : DomainException
{
    public AccessDeniedException() : base() { }

    public AccessDeniedException(string message) : base(message) { }
}
