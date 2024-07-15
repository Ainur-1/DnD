using Newtonsoft.Json.Converters;
using Newtonsoft.Json;

namespace Domain.Entities.Characters;

[JsonConverter(typeof(StringEnumConverter))]
public enum CharacterSkillType
{
    Acrobatics,
    AnimalHanding,
    Arcana,
    Athletics,
    Deception,
    History,
    Insight,
    Intimidation,
    Investigation,
    Medicine,
    Nature,
    Perception,
    Performance,
    Persuasion,
    Religion,
    HandSleight,
    Stealth,
    Survival
}
