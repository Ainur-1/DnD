using AutoMapper;
using Contracts;
using Domain.Entities.Characters;

namespace Mappings.Profiles.Characters;

internal class CharacterStatsDtoMappingProfile : Profile
{
    public CharacterStatsDtoMappingProfile()
    {
        CreateMap<CharacterStats, CharacterStatsDto>()
        .ForMember(dest => dest.ProficiencyBonus, opt => opt.MapFrom(src => src.ProficiencyBonus))
        .ForMember(dest => dest.InitiativeModifier, opt => opt.MapFrom(src => src.InitiativeModifier))
        .ForMember(dest => dest.StrengthModifier, opt => opt.MapFrom(src => src.StrengthModifier))
        .ForMember(dest => dest.DexterityModifier, opt => opt.MapFrom(src => src.DexterityModifier))
        .ForMember(dest => dest.ConstitutionModifier, opt => opt.MapFrom(src => src.ConstitutionModifier))
        .ForMember(dest => dest.IntelligenceModifier, opt => opt.MapFrom(src => src.IntelligenceModifier))
        .ForMember(dest => dest.WisdomModifier, opt => opt.MapFrom(src => src.WisdomModifier))
        .ForMember(dest => dest.CharismaModifier, opt => opt.MapFrom(src => src.CharismaModifier))
        .ForMember(dest => dest.AcrobaticsSkillModifier, opt => opt.MapFrom(src => src.AcrobaticsSkillModifier))
        .ForMember(dest => dest.InvestigationSkillModifier, opt => opt.MapFrom(src => src.InvestigationSkillModifier))
        .ForMember(dest => dest.AthleticsSkillModifier, opt => opt.MapFrom(src => src.AthleticsSkillModifier))
        .ForMember(dest => dest.PerceptionSkillModifier, opt => opt.MapFrom(src => src.PerceptionSkillModifier))
        .ForMember(dest => dest.SurvivalSkillModifier, opt => opt.MapFrom(src => src.SurvivalSkillModifier))
        .ForMember(dest => dest.PerformanceSkillModifier, opt => opt.MapFrom(src => src.PerformanceSkillModifier))
        .ForMember(dest => dest.PersuasionSkillModifier, opt => opt.MapFrom(src => src.PersuasionSkillModifier))
        .ForMember(dest => dest.HistorySkillModifier, opt => opt.MapFrom(src => src.HistorySkillModifier))
        .ForMember(dest => dest.HandSleightSkillModifier, opt => opt.MapFrom(src => src.HandSleightSkillModifier))
        .ForMember(dest => dest.ArcanaSkillModifier, opt => opt.MapFrom(src => src.ArcanaSkillModifier))
        .ForMember(dest => dest.MedicineSkillModifier, opt => opt.MapFrom(src => src.MedicineSkillModifier))
        .ForMember(dest => dest.DeceptionSkillModifier, opt => opt.MapFrom(src => src.DeceptionSkillModifier))
        .ForMember(dest => dest.NatureSkillModifier, opt => opt.MapFrom(src => src.NatureSkillModifier))
        .ForMember(dest => dest.InsightSkillModifier, opt => opt.MapFrom(src => src.InsightSkillModifier))
        .ForMember(dest => dest.ReligionSkillModifier, opt => opt.MapFrom(src => src.ReligionSkillModifier))
        .ForMember(dest => dest.StealthSkillModifier, opt => opt.MapFrom(src => src.StealthSkillModifier))
        .ForMember(dest => dest.IntimidationSkillModifier, opt => opt.MapFrom(src => src.IntimidationSkillModifier))
        .ForMember(dest => dest.AnimalHandingSkillModifier, opt => opt.MapFrom(src => src.AnimalHandingSkillModifier))
        .ForMember(dest => dest.StrengthSavingThrowModifier, opt => opt.MapFrom(src => src.StrengthSavingThrowModifier))
        .ForMember(dest => dest.DexteritySavingThrowModifier, opt => opt.MapFrom(src => src.DexteritySavingThrowModifier))
        .ForMember(dest => dest.ConstitutionSavingThrowModifier, opt => opt.MapFrom(src => src.ConstitutionSavingThrowModifier))
        .ForMember(dest => dest.IntelligenceSavingThrowModifier, opt => opt.MapFrom(src => src.IntelligenceSavingThrowModifier))
        .ForMember(dest => dest.WisdomSavingThrowModifier, opt => opt.MapFrom(src => src.WisdomSavingThrowModifier))
        .ForMember(dest => dest.HitPointsMaximum, opt => opt.MapFrom(src => src.HitPointsMaximum))
        .ForMember(dest => dest.HitPointDice, opt => opt.MapFrom(src => src.HitPointDice))
        .ForMember(dest => dest.HitPointsDiceMaximumCount, opt => opt.MapFrom(src => src.HitPointsDiceMaximumCount))
        .ForMember(dest => dest.CharismaSavingThrowModifier, opt => opt.MapFrom(src => src.CharismaSavingThrowModifier));
    }
}
