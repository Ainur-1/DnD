using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Domain.Entities;

[JsonConverter(typeof(StringEnumConverter))]
public enum AccessType
{
    Public,
    Private
}
