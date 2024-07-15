using AutoMapper;
using Contracts;
using Domain.Entities.Characters;


namespace Mappings.Profiles.Characters;

internal class CharacterDtoMappingProfile : Profile
{
    public CharacterDtoMappingProfile()
    {
        CreateMap<Character, CharacterDto>()
        .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
        .ForMember(dest => dest.Personality, opt => opt.MapFrom(src => src.Personality))
        .ForMember(dest => dest.DynamicStats, opt => opt.MapFrom(src => ShouldMapDynamicStats(src) ? src : null))
        .ForMember(dest => dest.IsInParty, opt => opt.MapFrom(src => src.Info.JoinedPartyId != default))
        .ForMember(dest => dest.IsDead, opt => opt.MapFrom(src => src.Info.IsDead));
    }

    private bool ShouldMapDynamicStats(Character src)
    {
        return src.Info.JoinedPartyId != default && src.InGameStats != null;
    }
}
