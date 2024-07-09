using AutoMapper;
using Contracts.Online;
using Domain.Entities.Character;

namespace Mappings.Profiles.Character;

internal class GameCharacterMappingProfile : Profile
{
    public GameCharacterMappingProfile()
    {
        CreateMap<CharacterAggregate, GameCharacterDto>()
            .ForMember(x => x.Id, opt => opt.MapFrom(x => x.Id))
            .ForMember(x => x.CharacterStats, opt => opt.MapFrom(x => x.Stats))
            .ForMember(x => x.Personality, opt => opt.MapFrom(opt => opt.Personality))
            .ForMember(x => x.DynamicStats, opt => opt.MapFrom(opt => opt));
    }
}
