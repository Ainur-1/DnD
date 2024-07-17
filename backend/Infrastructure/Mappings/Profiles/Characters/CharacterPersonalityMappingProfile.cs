using AutoMapper;
using Contracts;
using Domain.Entities.Characters;
using Newtonsoft.Json;


namespace Mappings.Profiles.Characters;

internal class CharacterPersonalityMappingProfile : Profile
{
    public CharacterPersonalityMappingProfile()
    {
        CreateMap<CharacterPersonality, CharacterPersonalityDto>()
        .ForMember(dest => dest.Base64Image, opt => opt.MapFrom(src => src.Image != null ? Convert.ToBase64String(src.Image) : null))
        .ForMember(dest => dest.Race, opt => opt.MapFrom(src => src.Race.ToString()))
        .ForMember(dest => dest.Class, opt => opt.MapFrom(src => JsonConvert.SerializeObject(src.Class)))
        .ForMember(dest => dest.ClassFeatures, opt => opt.MapFrom(src => src.ClassFeatures))
        .ForMember(dest => dest.RaceTraits, opt => opt.MapFrom(src => src.RaceTraits))
        .ForMember(dest => dest.Languages, opt => opt.MapFrom(src => src.Languages))
        .ForMember(dest => dest.OtherTraits, opt => opt.MapFrom(src => src.OtherTraits));
    }
}
