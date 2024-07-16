namespace Domain.Exceptions;

public class InconsistentOperationException : DomainException
{
    public InconsistentOperationException(string message): base(message)
    {

    }
}
