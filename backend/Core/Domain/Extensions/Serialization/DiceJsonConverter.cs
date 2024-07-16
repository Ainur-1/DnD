using Domain.Entities;

namespace Domain.Extensions.Serialization;

internal class DiceJsonConverter : MapJsonConverter<Dice>
{
    protected override IReadOnlyDictionary<Dice, string> ToStringMap => DiceToStringMapping.DiceToStringMap;

    protected override IReadOnlyDictionary<string, Dice> FromStringMap => DiceToStringMapping.StringToDiceMap;
}