using MongoDB.Driver;

namespace DataAccess;

public record DndDatabase
{
    public IMongoDatabase Database { get; init; }
}
