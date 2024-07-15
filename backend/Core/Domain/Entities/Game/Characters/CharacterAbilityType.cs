using Newtonsoft.Json.Converters;
using Newtonsoft.Json;

namespace Domain.Entities.Characters;

[JsonConverter(typeof(StringEnumConverter))]
public enum CharacterAbilityType
{
    Strength,
    Dexterity,
    Constitution,
    Intelligence,
    Wisdom,
    Charisma
}
