using Domain.Entities.Game.Items;

namespace Domain.Entities.Items.Armors;

public record Armor : Item
{
    public int BaseArmorClass { get; init; }

    public ArmorType ArmorType { get; init; }

    public string Material { get; init; }

    public int? RequiredStrength { get; init; }

    public bool HasStealthDisadvantage { get; init; }

    public int? MaxPossibleDexterityModifier { get; init; }

    public int CalculateArmorClass(int characterDexterityModifier)
    {
        if (ArmorType == ArmorType.Shield)
            return 2;

        return BaseArmorClass + MaxPossibleDexterityModifier == null ? characterDexterityModifier : Math.Min(MaxPossibleDexterityModifier!.Value, characterDexterityModifier);
    }

    public int CalculateSpeedExpenses(int characterStrength)
        => RequiredStrength is null || characterStrength >= RequiredStrength ? 0 : 10;
}
