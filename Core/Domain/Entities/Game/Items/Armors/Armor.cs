using Domain.Entities.Game.Items;

namespace Domain.Entities.Items.Armors;

public class Armor : Item
{
    public int BaseArmorClass { get; protected set; }

    public ArmorType ArmorType { get; protected set; }

    public string Material { get; protected set; }

    public int? RequiredStrength { get; protected set; }

    public bool HasStealthDisadvantage { get; protected set; }

    public int? MaxPossibleDexterityModifier { get; protected set; }

    public override string ItemType => nameof(Armor);

    protected Armor() { }


    public int CalculateArmorClass(int characterDexterityModifier)
    {
        if (ArmorType == ArmorType.Shield)
            return 2;

        return BaseArmorClass + MaxPossibleDexterityModifier == null ? characterDexterityModifier : Math.Min(MaxPossibleDexterityModifier!.Value, characterDexterityModifier);
    }

    public int CalculateSpeedExpenses(int characterStrength)
        => RequiredStrength is null || characterStrength >= RequiredStrength ? 0 : 10;
}
