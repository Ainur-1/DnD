using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Domain.Entities.Races;

[JsonConverter(typeof(StringEnumConverter))]
public enum Size
{
    Small,
    Medium,
    Big
}
