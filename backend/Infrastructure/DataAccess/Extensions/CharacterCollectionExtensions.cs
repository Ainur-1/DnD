using Domain.Entities.Character;
using MongoDB.Driver;

namespace DataAccess.Extensions;

public static class CharacterCollectionExtensions
{
    public static IFindFluent<CharacterAggregate, CharacterAggregate> FindByOwnerAndParty(this IMongoCollection<CharacterAggregate> collection, Guid ownerId, Guid partyId)
        => collection.Find(x => x.Info.OwnerId == ownerId && x.Info.JoinedPartyId == partyId);

    public static IFindFluent<CharacterAggregate, CharacterAggregate> WhereIdIsIn(this IMongoCollection<CharacterAggregate> collection, IEnumerable<Guid> filterIds)
        => collection.Find(Builders<CharacterAggregate>.Filter.In(c => c.Id, filterIds));

    public static IFindFluent<CharacterAggregate, OnlyIdAndPersonalityProjection> ProjectOnlyIdAndPersonalityAndInfo(this IFindFluent<CharacterAggregate, CharacterAggregate> collection)
    => collection.Project<OnlyIdAndPersonalityProjection>(Builders<CharacterAggregate>.Projection
       .Exclude(x => x.Inventory)
            .Include(x => x.Info)
            .Exclude(x => x.Stats)
            .Exclude(x => x.InGameStats)
            .Include(x => x.Info)
            .Include(x => x.Id)
            .Include(x => x.Personality));

    public record OnlyIdAndPersonalityProjection
    {
        public Guid Id { get; set; }

        public CharacterPersonality Personality { get; set; }

        public CharacterManagement Info { get; set; }
    }
}
