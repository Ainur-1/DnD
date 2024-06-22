using Newtonsoft.Json.Converters;
using Newtonsoft.Json;

namespace Domain.Entities.Races;

[JsonConverter(typeof(StringEnumConverter))]
public enum RaceType 
{
    Dwarf,
    Elf,
    Halfling,
    Human,
    Dragonborn,
    Gnome,
    HalfElf,
    HalfOrc,
    Tiefling,
}
