using Domain.Extensions.Serialization;
using Newtonsoft.Json;

namespace Domain.Entities;

/// <summary>
/// Represents dice.
/// </summary>
[JsonConverter(typeof(DiceJsonConverter))]
public enum Dice
{
    OneD1,
    OneD2,
    OneD3,
    OneD4,
    OneD6,
    OneD8,
    OneD10,
    OneD12,
    TwoD6,
    TwoD10,
}

public static class DiceExtensions
{
    public static int GetMaximumValue(this Dice dice)
        => dice switch
        {
            Dice.OneD1 => 1,
            Dice.OneD2 => 2,
            Dice.OneD3 => 3,
            Dice.OneD4 => 4,
            Dice.OneD6 => 6,
            Dice.OneD8 => 8,
            Dice.OneD10 => 10,
            Dice.OneD12 or Dice.TwoD6 => 12,
            Dice.TwoD10 => 20,
            _ => throw new ArgumentOutOfRangeException(nameof(dice), dice, "Unknown dice.")
        };
}
