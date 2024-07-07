namespace Domain.Exceptions;


public class InvalidArgumentValueException : DomainException
{
    public InvalidArgumentValueException(string argumentName)
    {
        ArgumentName = argumentName;
    }

    public string ArgumentName { get; }

    public string? ValidExample { get; set; }
    
    public object? InvalidValue { get; set; }
}
