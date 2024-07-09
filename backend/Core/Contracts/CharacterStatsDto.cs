using Domain.Entities;

namespace Contracts;

public record CharacterStatsDto
{
    public int ProficiencyBonus { get; init; }

    public int InitiativeModifier { get; init; }

    #region Abilities
    public int StrengthAbility { get; init; }

    public int DexterityAbility { get; init; }

    public int ConstitutionAbility { get; init; }

    public int IntelligenceAbility { get;  init; }

    public int WisdomAbility { get;  init; }

    public int CharismaAbility { get;  init; }

    public int StrengthModifier {  get;  init; }

    public int DexterityModifier { get;  init; }

    public int ConstitutionModifier { get;  init; }

    public int IntelligenceModifier { get;  init; }

    public int WisdomModifier { get;  init; }

    public int CharismaModifier { get;  init; }
    #endregion

    #region Skills
    public int AcrobaticsSkillModifier { get;  init; }

    public int InvestigationSkillModifier { get;  init; }

    public int AthleticsSkillModifier { get;  init; }

    public int PerceptionSkillModifier { get;  init; }

    public int SurvivalSkillModifier { get;  init; }

    public int PerformanceSkillModifier { get;  init; }

    public int PersuasionSkillModifier { get;  init; }

    public int HistorySkillModifier { get;  init; }

    public int HandSleightSkillModifier { get;  init; }

    public int ArcanaSkillModifier { get;  init; }

    public int MedicineSkillModifier { get;  init; }

    public int DeceptionSkillModifier { get;  init; }

    public int NatureSkillModifier { get;  init; }

    public int InsightSkillModifier { get;  init; }

    public int ReligionSkillModifier { get;  init; }

    public int StealthSkillModifier { get;  init; }

    public int IntimidationSkillModifier { get;  init; }

    public int AnimalHandingSkillModifier { get;  init; }

    #endregion

    #region Saving Throws
    public int StrengthSavingThrowModifier { get;  init; }

    public int DexteritySavingThrowModifier { get;  init; }

    public int ConstitutionSavingThrowModifier { get;  init; }

    public int IntelligenceSavingThrowModifier { get;  init; }

    public int WisdomSavingThrowModifier { get;  init; }

    public int CharismaSavingThrowModifier { get;  init; }

    #endregion

    #region Hit Points
    public int HitPointsMaximum { get;  init; }

    public int HitPointsDiceMaximumCount { get;  init; }

    public Dice HitPointDice { get;  init; }

    #endregion
}
