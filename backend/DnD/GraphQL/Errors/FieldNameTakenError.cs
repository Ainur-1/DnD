using Domain.Exceptions;

namespace DnD.GraphQL.Errors;

public class FieldNameTakenError
{
    private FieldNameTakenError(string name, string propName)
    {
        Message = $"{propName} '{name}' уже занято.";
    }

    public static FieldNameTakenError CreateErrorFrom(UsernameTakenException ex)
    {
        return new FieldNameTakenError(ex.Username, "Логин");
    }

    public static FieldNameTakenError CreateErrorFrom(EmailTakenException ex)
    {
        return new FieldNameTakenError(ex.Email, "Почта");
    }

    public string Message { get; }
}
