using Domain.Entities;

namespace Contracts;

public class CharacterStatsDto
{

    #region Abilities
    public int StrengthAbility { get; protected set; }

    public int DexterityAbility { get; protected set; }

    public int ConstitutionAbility { get; protected set; }

    public int IntelligenceAbility { get; protected set; }

    public int WisdomAbility { get; protected set; }

    public int CharismaAbility { get; protected set; }

    public int StrengthModifier {  get; set; }

    public int DexterityModifier { get; set; }

    public int ConstitutionModifier { get; set; }

    public int IntelligenceModifier { get; set; }

    public int WisdomModifier { get; set; }

    public int CharismaModifier { get; set; }
    #endregion

    #region Skills
    public int AcrobaticsSkillModifier { get; set; }

    public int InvestigationSkillModifier { get; set; }

    public int AthleticsSkillModifier { get; set; }

    public int PerceptionSkillModifier { get; set; }

    public int SurvivalSkillModifier { get; set; }

    public int PerformanceSkillModifier { get; set; }

    public int PersuasionSkillModifier { get; set; }

    public int HistorySkillModifier { get; set; }

    public int HandSleightSkillModifier { get; set; }

    public int ArcanaSkillModifier { get; set; }

    public int MedicineSkillModifier { get; set; }

    public int DeceptionSkillModifier { get; set; }

    public int NatureSkillModifier { get; set; }

    public int InsightSkillModifier { get; set; }

    public int ReligionSkillModifier { get; set; }

    public int StealthSkillModifier { get; set; }

    public int IntimidationSkillModifier { get; set; }

    public int AnimalHandingSkillModifier { get; set; }

    #endregion

    #region Saving Throws
    public int StrengthSavingThrowModifier { get; set; }

    public int DexteritySavingThrowModifier { get; set; }

    public int ConstitutionSavingThrowModifier { get; set; }

    public int IntelligenceSavingThrowModifier { get; set; }

    public int WisdomSavingThrowModifier { get; set; }

    public int CharismaSavingThrowModifier { get; set; }

    #endregion

    #region Hit Points
    public int HitPointsMaximum { get; protected set; }

    public int HitPointsDiceMaximumCount { get; protected set; }

    public Dice HitPointDice { get; protected set; }

    #endregion
}
