using Newtonsoft.Json.Converters;
using Newtonsoft.Json;

namespace Domain.Entities.Classes;

[JsonConverter(typeof(StringEnumConverter))]
public enum ClassType
{
    Barbarian = 1,
    Bard,
    Cleric,
    Druid,
    Fighter,
    Monk,
    Paladin,
    Rogue,
    Sorcerer,
    Warlock,
    Wizard,
}
