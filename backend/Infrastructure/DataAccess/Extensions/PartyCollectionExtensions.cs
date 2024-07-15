using Domain.Entities.Parties;
using MongoDB.Driver;

namespace DataAccess.Extensions;

public static class PartyCollectionExtensions
{
    public static IFindFluent<Party, Party> FindById(this IMongoCollection<Party> collection, Guid id) => collection.Find(x => x.Id == id);

    public static IFindFluent<Party, OnlyCharacterIdsProjection> OnlyCharacterIds(this IFindFluent<Party, Party> collection)
        => collection.Project<OnlyCharacterIdsProjection>(Builders<Party>.Projection
            .Include(x => x.Id)
            .Exclude(x => x.GameMasterId)
            .Exclude(x => x.AccessCode)
            .Include(x => x.InGameCharactersIds));

    public record OnlyCharacterIdsProjection
    {
        public IEnumerable<Guid> InGameCharactersIds { get; init; }

        public Guid Id { get; init; }
    }
}
