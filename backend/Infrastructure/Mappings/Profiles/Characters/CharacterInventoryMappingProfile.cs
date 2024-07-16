using AutoMapper;
using Contracts;
using Domain.Entities.Characters;

namespace Mappings.Profiles.Characters;

internal class CharacterInventoryMappingProfile : Profile
{
    public CharacterInventoryMappingProfile()
    {
        CreateMap<CharacterInventory, CharacterInventoryDto>()
            .ForMember(x => x.Wallet, opt => opt.MapFrom(x => x.Wallet))
            .ForMember(x => x.Items, opt => opt.MapFrom(x => x.Items))
            .ForMember(x => x.TotalWeightInPounds, opt => opt.MapFrom(x => x.TotalWeightInPounds));
    }
}
