using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Domain.Entities.Items.Weapons;

[JsonConverter(typeof(StringEnumConverter))]
public enum WeaponAttackType
{
    Piercing,
    Bludgeoning,
    Slashing,
}
