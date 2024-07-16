using Domain.Entities.Characters;
using MongoDB.Driver;
using MongoDB.Driver.Search;

namespace DataAccess.Extensions;

public static class CharacterCollectionExtensions
{
    public static IFindFluent<Character, Character> FindByOwnerAndParty(this IMongoCollection<Character> collection, Guid ownerId, Guid partyId)
        => collection.Find(x => x.Info.OwnerId == ownerId && x.Info.JoinedPartyId == partyId);

    public static IFindFluent<Character, Character> WhereIdIsIn(this IMongoCollection<Character> collection, IEnumerable<Guid> filterIds)
        => collection.Find(Builders<Character>.Filter.In(c => c.Id, filterIds));

    public static IFindFluent<Character, Character> FindById(this IMongoCollection<Character> collection, Guid characterId)
    => collection.Find(x => x.Id == characterId);

    public static IFindFluent<Character, OnlyIdAndPersonalityProjection> ProjectOnlyIdAndPersonalityAndInfo(this IFindFluent<Character, Character> collection)
    => collection.Project<OnlyIdAndPersonalityProjection>(Builders<Character>.Projection
            .Include(x => x.Info)
            .Include(x => x.Id)
            .Include(x => x.Personality));

    public record OnlyIdAndPersonalityProjection
    {
        public Guid Id { get; set; }

        public CharacterPersonality Personality { get; set; }

        public CharacterManagement Info { get; set; }
    }

    public static FilterDefinition<Character> GetByIdFilter(Guid id) => Builders<Character>.Filter
        .Eq(x => x.Id, id);

    public static Task<Character?> GetByIdAsync(this IMongoCollection<Character> collection, Guid id)
        => collection.FindById(id).SingleOrDefaultAsync();

    public static UpdateDefinition<Character> SetInGameStats(this UpdateDefinition<Character> updateDefinition, CharacterDynamicProperties inGameStats)
        => updateDefinition.Set(x => x.InGameStats, inGameStats);

    public static UpdateDefinition<Character> SetInGameStats(this UpdateDefinitionBuilder<Character> updateDefinition, CharacterDynamicProperties inGameStats)
    => updateDefinition.Set(x => x.InGameStats, inGameStats);
}
