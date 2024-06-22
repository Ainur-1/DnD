using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;

namespace DataAccess.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection RegisterDatabaseServices(this IServiceCollection serviceCollection, MongoDbSettings mongoDbSettings)
    {
        AddDatabaseProvider(serviceCollection, mongoDbSettings);
        AddRepositories(serviceCollection);

        return serviceCollection;
    }

    private static void AddDatabaseProvider(IServiceCollection serviceCollection, MongoDbSettings mongoDbSettings)
    {
        serviceCollection.AddSingleton<IMongoClient>(new MongoClient(mongoDbSettings.GetConnectionString()));
        serviceCollection.AddScoped<DndDatabase>(sp =>
        {
            var client = sp.GetService<IMongoClient>()!;
            var database = client.GetDatabase(Constants.DATABASE_NAME);

            return new DndDatabase { Database = database };
        });
    }

    private static void AddRepositories(IServiceCollection serviceCollection)
    {
        //todo: register repositories here
    }
}
