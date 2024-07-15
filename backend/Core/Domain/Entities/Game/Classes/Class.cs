using Domain.Entities.Characters;
using Domain.Entities.Items.Armors;

namespace Domain.Entities.Classes;

public class Class
{
    public ClassType Id { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public string StartInventoryDescription { get; set; }

    public Dice HitDice { get; set; }

    public CharacterSkillType[] SkillTraitsMastery { get; set; }

    public int SkillMasteryToChooseCount { get; set; }

    public CharacterAbilityType[] SavingThrowsTraitsMastery { get; set; }

    public string[] WeaponProficiency { get; set; }

    public ArmorType[] ArmorProficiency { get; set; }

    public ClassFeature[] ClassFeatures { get; set; } = Array.Empty<ClassFeature>();
}