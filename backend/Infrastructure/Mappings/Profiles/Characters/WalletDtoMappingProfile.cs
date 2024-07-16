using AutoMapper;
using Contracts.Character;
using Domain.Entities.Characters;

namespace Mappings.Profiles.Characters;

internal class WalletDtoMappingProfile : Profile
{
    public WalletDtoMappingProfile()
    {
        CreateMap<CharacterCurrency, WalletDto>()
            .ForMember(x => x.Copper, opt => opt.MapFrom(x => x.CopperCoins))
            .ForMember(x => x.Silver, opt => opt.MapFrom(x => x.SilverCoins))
            .ForMember(x => x.Electrum, opt => opt.MapFrom(x => x.ElectrumCoins))
            .ForMember(x => x.Gold, opt => opt.MapFrom(x => x.GoldCoins))
            .ForMember(x => x.Platinum, opt => opt.MapFrom(x => x.PlatinumCoins));
    }
}
