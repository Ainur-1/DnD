using Domain.Extensions.Serialization;
using Newtonsoft.Json;

namespace Domain.Entities.Races;

[JsonConverter(typeof(SizeJsonConverter))]
public enum Size
{
    Small,
    Medium,
    Big
}
