using Newtonsoft.Json.Converters;
using Newtonsoft.Json;
using Domain.Extensions.Serialization;

namespace Domain.Entities.Classes;

[JsonConverter(typeof(ClassTypeJsonConverter))]
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
    Ranger
}
