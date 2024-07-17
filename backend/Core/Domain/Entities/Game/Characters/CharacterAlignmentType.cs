using Newtonsoft.Json.Converters;
using Newtonsoft.Json;

namespace Domain.Entities.Characters;

[JsonConverter(typeof(StringEnumConverter))]
public enum CharacterAlignmentType
{
    LawfulGood,
    NeutralGood,
    ChaoticGood,
    LawfulNeutral,
    TrueNeutral,
    ChaoticNeutral,
    LawfulEvil,
    NeutralEvil,
    ChaoticEvil,
    Unaligned,
    Any
}
