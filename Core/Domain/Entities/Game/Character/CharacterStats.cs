﻿namespace Domain.Entities.Character;

public class CharacterStats
{
    protected CharacterStats() { }

    public int ProficiencyBonus { get; protected set; }

    #region Abilities
    public int StrengthAbility { get; protected set; }

    public int DexterityAbility { get; protected set; }

    public int ConstitutionAbility { get; protected set; }

    public int IntelligenceAbility { get; protected set; }

    public int WisdomAbility { get; protected set; }

    public int CharismaAbility { get; protected set; }

    public int StrengthModifier => CalculateAbilityModifier(StrengthAbility);

    public int DexterityModifier => CalculateAbilityModifier(DexterityAbility);

    public int ConstitutionModifier => CalculateAbilityModifier(ConstitutionAbility);

    public int IntelligenceModifier => CalculateAbilityModifier(IntelligenceAbility);

    public int WisdomModifier => CalculateAbilityModifier(WisdomAbility);

    public int CharismaModifier => CalculateAbilityModifier(CharismaAbility);
    #endregion

    #region Skills
    public CharacterSkillType[] SkillTraits { get; protected set; } = Array.Empty<CharacterSkillType>();

    public int AcrobaticsSkillModifier => CalculateSkillModifier(CharacterSkillType.Acrobatics, CharacterAbilityType.Dexterity);

    public int InvestigationSkillModifier => CalculateSkillModifier(CharacterSkillType.Investigation, CharacterAbilityType.Intelligence);

    public int AthleticsSkillModifier => CalculateSkillModifier(CharacterSkillType.Athletics, CharacterAbilityType.Strength);

    public int PerceptionSkillModifier => CalculateSkillModifier(CharacterSkillType.Perception, CharacterAbilityType.Wisdom);

    public int SurvivalSkillModifier => CalculateSkillModifier(CharacterSkillType.Survival, CharacterAbilityType.Wisdom);

    public int PerformanceSkillModifier => CalculateSkillModifier(CharacterSkillType.Performance, CharacterAbilityType.Charisma);

    public int PersuasionSkillModifier => CalculateSkillModifier(CharacterSkillType.Persuasion, CharacterAbilityType.Charisma);

    public int HistorySkillModifier => CalculateSkillModifier(CharacterSkillType.History, CharacterAbilityType.Intelligence);

    public int HandSleightSkillModifier => CalculateSkillModifier(CharacterSkillType.HandSleight, CharacterAbilityType.Dexterity);

    public int ArcanaSkillModifier => CalculateSkillModifier(CharacterSkillType.Arcana, CharacterAbilityType.Intelligence);

    public int MedicineSkillModifier => CalculateSkillModifier(CharacterSkillType.Medicine, CharacterAbilityType.Wisdom);

    public int DeceptionSkillModifier => CalculateSkillModifier(CharacterSkillType.Deception, CharacterAbilityType.Charisma);

    public int NatureSkillModifier => CalculateSkillModifier(CharacterSkillType.Nature, CharacterAbilityType.Intelligence);

    public int InsightSkillModifier => CalculateSkillModifier(CharacterSkillType.Insight, CharacterAbilityType.Wisdom);

    public int ReligionSkillModifier => CalculateSkillModifier(CharacterSkillType.Religion, CharacterAbilityType.Intelligence);

    public int StealthSkillModifier => CalculateSkillModifier(CharacterSkillType.Stealth, CharacterAbilityType.Dexterity);

    public int IntimidationSkillModifier => CalculateSkillModifier(CharacterSkillType.Intimidation, CharacterAbilityType.Charisma);

    public int AnimalHandingSkillModifier => CalculateSkillModifier(CharacterSkillType.AnimalHanding, CharacterAbilityType.Wisdom);

    #endregion

    #region Saving Throws
    public int StrengthSavingThrowModifier => CalculateSavingThrowModifier(CharacterAbilityType.Strength);

    public int DexteritySavingThrowModifier => CalculateSavingThrowModifier(CharacterAbilityType.Dexterity);

    public int ConstitutionSavingThrowModifier => CalculateSavingThrowModifier(CharacterAbilityType.Constitution);

    public int IntelligenceSavingThrowModifier => CalculateSavingThrowModifier(CharacterAbilityType.Intelligence);

    public int WisdomSavingThrowModifier => CalculateSavingThrowModifier(CharacterAbilityType.Wisdom);

    public int CharismaSavingThrowModifier => CalculateSavingThrowModifier(CharacterAbilityType.Charisma);

    public CharacterAbilityType[] SavingThrowsTraits { get; protected set; } = Array.Empty<CharacterAbilityType>();
    #endregion

    #region Hit Points
    public int HitPointsMaximum { get; protected set; }

    public int HitPointsDiceMaximumCount { get; protected set; }

    public Dice HitPointDice { get; protected set; }

    #endregion

    #region Armor Class
    public int BaseArmorClass => 10 + DexterityModifier;
    #endregion 

    private int CalculateSavingThrowModifier(CharacterAbilityType savesDependedAbility)
        => SavingThrowsTraits.Contains(savesDependedAbility) ? GetAbilityValueByType(savesDependedAbility) + ProficiencyBonus : GetAbilityValueByType(savesDependedAbility);

    private int CalculateSkillModifier(CharacterSkillType skillType, CharacterAbilityType dependedAbility)
        => SkillTraits.Contains(skillType) ? GetAbilityValueByType(dependedAbility) + ProficiencyBonus : GetAbilityValueByType(dependedAbility);

    private int GetAbilityValueByType(CharacterAbilityType abilityType)
        => abilityType switch
        {
            CharacterAbilityType.Strength => StrengthAbility,
            CharacterAbilityType.Dexterity => DexterityAbility,
            CharacterAbilityType.Constitution => ConstitutionAbility,
            CharacterAbilityType.Intelligence => IntelligenceAbility,
            CharacterAbilityType.Wisdom => WisdomAbility,
            CharacterAbilityType.Charisma => CharismaAbility,
            _ => throw new ArgumentOutOfRangeException(nameof(abilityType), abilityType, $"Invalid {nameof(CharacterAbilityType)} value."),
        };

    private static int CalculateAbilityModifier(int abilityValue)
            => (int)Math.Round((abilityValue - 10) / 2d, MidpointRounding.ToNegativeInfinity);
}