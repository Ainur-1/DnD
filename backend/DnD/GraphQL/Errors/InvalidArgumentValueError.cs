using Domain.Exceptions;

namespace DnD.GraphQL.Errors;

public class InvalidArgumentValueError
{
    private InvalidArgumentValueError(string argName, string? example)
    {
        Message = $"{argName} не валидно. {example}";
    }

    public static InvalidArgumentValueError CreateErrorFrom(InvalidArgumentValueException ex)
    {
        return new InvalidArgumentValueError(ex.ArgumentName, ex.ValidExample);
    }

    public string Message { get; }
}
