using Newtonsoft.Json.Converters;
using Newtonsoft.Json;

namespace Domain.Entities.Items.Armors;

[JsonConverter(typeof(StringEnumConverter))]
public enum ArmorType
{
    Light,
    Medium,
    Heavy,
    Shield
}
