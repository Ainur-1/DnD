namespace Domain.Entities.Items.Armors;

public class Armor : Item
{
    public int BaseArmorClass { get; protected set; }

    public ArmorType ArmorType { get; protected set; }

    public string Material { get; protected set; }

    public int? RequiredStrength { get; protected set; }

    public bool Disadvantage { get; protected set; }

    public int MaxPossibleDexterityModifier { get; protected set; }

    protected Armor() { }


    public int CalculateArmorClass(int characterDexterityModifier)
    {
        if (ArmorType == ArmorType.Shield)
            return 2;

        return BaseArmorClass + Math.Min(MaxPossibleDexterityModifier, characterDexterityModifier);
    }

    public int CalculateSpeedExpenses(int characterStrength)
        => RequiredStrength is null || characterStrength >= RequiredStrength ? 0 : 10;
}
