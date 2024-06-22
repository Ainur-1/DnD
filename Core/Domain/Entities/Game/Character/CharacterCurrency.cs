namespace Domain.Entities.Character;

public class CharacterCurrency
{
    public int CopperCoins { get; protected set; }

    public int SilverCoins { get; protected set; }

    public int ElectrumCoins { get; protected set; }

    public int GoldCoins { get; protected set; }

    public int PlatinumCoins { get; protected set; }

    public decimal SumCoinsInGoldEquivalent()
    {
        return CopperCoins / 100m + SilverCoins / 10m + ElectrumCoins / 2m + GoldCoins + PlatinumCoins * 10;
    }

    public float TotalWeightInPounds => (CopperCoins + SilverCoins + ElectrumCoins + GoldCoins + PlatinumCoins) / 50f;
}
