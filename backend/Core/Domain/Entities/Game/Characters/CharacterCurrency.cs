namespace Domain.Entities.Characters;

public class CharacterCurrency
{
    public int CopperCoins { get; protected set; }

    public int SilverCoins { get; protected set; }

    public int ElectrumCoins { get; protected set; }

    public int GoldCoins { get; protected set; }

    public int PlatinumCoins { get; protected set; }

    public float TotalWeightInPounds => (CopperCoins + SilverCoins + ElectrumCoins + GoldCoins + PlatinumCoins) / 50f;

    public CharacterCurrency(int copper, int silver, int electrum, int gold, int platinum) 
    {
        ArgumentOutOfRangeException.ThrowIfNegative(copper, nameof(copper));
        ArgumentOutOfRangeException.ThrowIfNegative(silver, nameof(silver));
        ArgumentOutOfRangeException.ThrowIfNegative(electrum, nameof(electrum));
        ArgumentOutOfRangeException.ThrowIfNegative(gold, nameof(gold));
        ArgumentOutOfRangeException.ThrowIfNegative(platinum, nameof(platinum));
    }

    protected CharacterCurrency() {}

    public decimal SumCoinsInGoldEquivalent()
    {
        return CopperCoins / 100m + SilverCoins / 10m + ElectrumCoins / 2m + GoldCoins + PlatinumCoins * 10;
    }
}
