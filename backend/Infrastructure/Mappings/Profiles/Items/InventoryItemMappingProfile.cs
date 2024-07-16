using AutoMapper;
using Contracts.Inventory;
using Domain.Entities.Game.Items;
using Domain.Entities.Items.Armors;
using Domain.Entities.Items.Weapons;
using Mappings.Resolvers;

namespace Mappings.Profiles.Items;

internal class InventoryItemMappingProfile : Profile
{
    public InventoryItemMappingProfile()
    {
        CreateMap<InventoryItem, InventoryItemDto>()
            .ForMember(x => x.Id, opt => opt.MapFrom(x => x.Id))
            .ForMember(x => x.Count, opt => opt.MapFrom(x => x.Count))
            .ForMember(x => x.InUse, opt => opt.MapFrom(x => x.InUse))
            .ForMember(x => x.IsItemProficiencyOn, opt => opt.MapFrom(x => x.IsItemProficiencyOn))
            .ForMember(x => x.Item, opt => opt.MapFrom<OneOfItemResolver>());
    }
}
