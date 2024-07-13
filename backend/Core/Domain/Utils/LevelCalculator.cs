namespace Domain.Utils;

public static class LevelCalculator 
{
    public static int XpToLevel(int xp)
    {
        return xp switch {
            < 0 => throw new ArgumentOutOfRangeException(),
            < 300 => 1,
            < 900 => 2,
            < 2700 => 3,
            < 6500 => 4,
            < 14_000 => 5,
            < 23_000 => 6,
            < 34_000 => 7,
            < 48_000 => 8,
            < 64_000 => 9,
            < 85_000 => 10,
            < 100_000 => 11,
            < 120_000 => 12,
            < 140_000 => 13,
            < 165_000 => 14,
            < 195_000 => 15,
            < 225_000 => 16,
            < 265_000 => 17,
            < 305_000 => 18,
            < 355_000 => 19,
            _ => 20
        };
    }
}