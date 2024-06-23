using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Domain.Entities.Items.Weapons;

[JsonConverter(typeof(StringEnumConverter))]
public enum WeaponProperty
{
    Ammunition,
    Finesse,
    Loading,
    Range,
    Reach,
    Special,
    Thrown,
    Light,
    Heavy,
    Versatile,
    TwoHanded
}
