using AutoMapper;
using Contracts;
using Domain.Entities.Character;


namespace Mappings.Profiles.Character;

internal class CharacterDtoMappingProfile : Profile
{
    public CharacterDtoMappingProfile()
    {
        CreateMap<CharacterAggregate, CharacterDto>()
        .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
        .ForMember(dest => dest.Personality, opt => opt.MapFrom(src => src.Personality))
        .ForMember(dest => dest.DynamicStats, opt => opt.MapFrom(src => ShouldMapDynamicStats(src) ? src : null))
        .ForMember(dest => dest.IsInParty, opt => opt.MapFrom(src => src.Info.JoinedPartyId != default))
        .ForMember(dest => dest.IsDead, opt => opt.MapFrom(src => src.Info.IsDead));
    }

    private bool ShouldMapDynamicStats(CharacterAggregate src)
    {
        return src.Info.JoinedPartyId != default && src.InGameStats != null;
    }
}
