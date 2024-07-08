using Domain.Exceptions;
using System.Text.RegularExpressions;

namespace Domain.Entities.Parties;

public class Party
{
    public Guid Id { get; protected set; }
    public Guid GameMasterId { get; protected set; }
    public List<Guid> InGameCharactersIds { get; protected set; }
    public string AccessCode { get; protected set; }
    public void AddCharacter(Guid characterId)
    {
        InGameCharactersIds?.Add(characterId);
    }
    public Party(Guid gameMasterId, string accessCode)
    {
        var regex = new Regex("^[a-zA-Z0-9]+$");
        if (string.IsNullOrWhiteSpace(accessCode) 
            || !regex.IsMatch(accessCode) 
            || accessCode.Length > 8 
            || accessCode.Length < 1)
        {
            throw new InvalidArgumentValueException(nameof(accessCode))
            {
                InvalidValue = accessCode,
                ValidExample = "Строка, содержащая только цифры и английские буквы длиной от 1 до 8."
            };
        }

        Id = Guid.NewGuid();
        GameMasterId = gameMasterId;
        InGameCharactersIds = new List<Guid>();
        AccessCode = accessCode;
    }
    protected Party() { }

}

