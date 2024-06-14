namespace Domain.Entities.Enums;

/// <summary>
/// Represents dice.
/// </summary>
public enum Dice
{
    OneD2,
    OneD3,
    OneD4,
    OneD6,
}

public static class DiceExtensions
{
    public static int GetMaximumValue(this Dice dice)
        => dice switch
        {
            Dice.OneD2 => 2,
            Dice.OneD3 => 3,
            Dice.OneD4 => 4,
            Dice.OneD6 => 6,
            _ => throw new ArgumentOutOfRangeException(nameof(dice), dice, "Unknown dice.")
        };    
}
