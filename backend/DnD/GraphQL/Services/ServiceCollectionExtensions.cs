using MongoDB.Driver;
using Domain.Entities.Character;
using Domain.Entities.Classes;
using Domain.Entities.Races;
using Domain.Entities.Game.Items;
using Domain.Entities.Parties;
using MongoDbGenericRepository;

namespace DnD.GraphQL.Services
{
    public static class ServiceCollectionExtensions
    {
        public static void AddMongoCollections(this IServiceCollection services)
        {
            services.AddSingleton(serviceProvider =>
            {
                var context = serviceProvider.GetRequiredService<IMongoDbContext>();
                return context.GetCollection<CharacterPersonality>();
            });

            services.AddSingleton(serviceProvider =>
            {
                var context = serviceProvider.GetRequiredService<IMongoDbContext>();
                return context.GetCollection<Class>();
            });

            services.AddSingleton(serviceProvider =>
            {
                var context = serviceProvider.GetRequiredService<IMongoDbContext>();
                return context.GetCollection<Item>();
            });

            services.AddSingleton(serviceProvider =>
            {
                var context = serviceProvider.GetRequiredService<IMongoDbContext>();
                return context.GetCollection<Party>();
            });

            services.AddSingleton(serviceProvider =>
            {
                var context = serviceProvider.GetRequiredService<IMongoDbContext>();
                return context.GetCollection<Race>();
            });
        }
    }
}