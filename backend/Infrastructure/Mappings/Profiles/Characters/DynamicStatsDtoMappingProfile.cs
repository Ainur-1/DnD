using AutoMapper;
using Contracts;
using Domain.Entities.Characters;
using Mappings.Resolvers;


namespace Mappings.Profiles.Characters;

internal class DynamicStatsDtoMappingProfile : Profile
{
    public DynamicStatsDtoMappingProfile()
    {
        CreateMap<Character, DynamicStatsDto>()
            .BeforeMap((x, _) => ArgumentNullException.ThrowIfNull(x.InGameStats, nameof(CharacterDynamicProperties)))
            .ForMember(x => x.IsDead, opt => opt.MapFrom(x => x.Info.IsDead))
            .ForMember(x => x.DeathSaves, opt => opt.MapFrom<DeathSavesResolver>())
            .ForMember(x => x.Inspiration, opt => opt.MapFrom(x => x.InGameStats!.InspirationBonus))
            .ForMember(x => x.Hp, opt => opt.MapFrom(x => x.InGameStats!.HitPoints))
            .ForMember(x => x.HitDicesLeftCount, opt => opt.MapFrom(x => x.InGameStats!.HitDicesLeft))
            .ForMember(x => x.ArmorClass, opt => opt.MapFrom(x => x.InGameStats!.ActualArmorClass))
            .ForMember(x => x.Speed, opt => opt.MapFrom(x => x.InGameStats!.ActualSpeed))
            .ForMember(x => x.IsDying, opt => opt.MapFrom(x => x.InGameStats!.IsDying))
            .ForMember(x => x.TempHp, opt => opt.MapFrom(x => x.InGameStats!.TemporaryHitPoints));
    }
}
