using Domain.Entities;

namespace Domain.Extensions.Serialization;

public static class DiceToStringMapping
{
    public static readonly IReadOnlyDictionary<Dice, string> DiceToStringMap = new Dictionary<Dice, string>()
    {
        [Dice.OneD1] = "1d1",
        [Dice.OneD2] = "1d2",
        [Dice.OneD3] = "1d3",
        [Dice.OneD4] = "1d4",
        [Dice.OneD6] = "1d6",
        [Dice.OneD8] = "1d8",
        [Dice.OneD10] = "1d10",
        [Dice.OneD12] = "1d12",
        [Dice.TwoD6] = "2d6",
        [Dice.TwoD10] = "2d10",
    };

    public static readonly IReadOnlyDictionary<string, Dice> StringToDiceMap = DiceToStringMap
                                                                       .Select(keyValue => new KeyValuePair<string, Dice>(keyValue.Value, keyValue.Key))
                                                                       .ToDictionary();
}
