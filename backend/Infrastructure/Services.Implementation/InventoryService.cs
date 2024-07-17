using Service.Abstractions;
using Domain.Entities.Game.Items;
using MongoDB.Driver;
using Domain.Entities.Characters;
using Domain.Exceptions;
using Contracts;
using AutoMapper;

namespace Services.Implementation;

public class InventoryService : IInventoryService
{
    private readonly IMongoCollection<Character> _characters;

    private readonly IMapper _mapper;

    public InventoryService(IMongoCollection<Character> collection, IMapper mapper)
    {
        _characters = collection;
        _mapper = mapper;
    }

    public Task AddItemAsync(Guid characterId, Item item)
    {
        throw new NotImplementedException();
    }

    public Task<bool> CheckInventoryItem(Guid characterId, string inventoryItemId, int count)
    {
        throw new NotImplementedException();
    }

    public Task DeleteItemAsync(Guid characterId, Guid inventoryItemId)
    {
        throw new NotImplementedException();
    }

    public async Task<CharacterInventoryDto> GetCharacterInventoryAsync(Guid issuerId, Guid characterId)
    {
        var projection = Builders<Character>.Projection
            .Include(x => x.Id)
            .Include(x => x.Inventory);

        var inventory = await _characters
            .Find(x => x.Id == characterId && x.Info.OwnerId == issuerId)
            .Project<Character>(projection)
            .SingleOrDefaultAsync() ?? throw new ObjectNotFoundException();

        return _mapper.Map<CharacterInventoryDto>(inventory.Inventory);
    }
}
