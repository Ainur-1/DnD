namespace Contracts.Inventory;

public record class StartWealthDto
{
    public int CopperCoins { get; protected set; }

    public int SilverCoins { get; protected set; }

    public int ElectrumCoins { get; protected set; }

    public int GoldCoins { get; protected set; }

    public int PlatinumCoins { get; protected set; }
}
