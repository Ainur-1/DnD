using Newtonsoft.Json.Converters;
using Newtonsoft.Json;
using Domain.Extensions.Serialization;

namespace Domain.Entities.Races;

[JsonConverter(typeof(RaceTypeJsonConverter))]
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
