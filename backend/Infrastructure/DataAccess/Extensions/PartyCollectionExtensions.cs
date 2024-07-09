using Domain.Entities.Parties;
using MongoDB.Driver;

namespace DataAccess.Extensions;

public static class PartyCollectionExtensions
{
    public static IFindFluent<Party, Party> FindById(this IMongoCollection<Party> collection, Guid id) => collection.Find(x => x.Id == id);
}
