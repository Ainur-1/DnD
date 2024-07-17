using DataAccess.DependencyInjection.Serialization;
using Domain.Entities;
using Domain.Entities.Characters;
using Domain.Entities.Classes;
using Domain.Entities.Game.Items;
using Domain.Entities.Game.Races;
using Domain.Entities.Items.Armors;
using Domain.Entities.Items.Weapons;
using Domain.Entities.Parties;
using Domain.Entities.Races;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
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
        RegisterClassMaps();

        serviceCollection.AddSingleton<IMongoClient>(new MongoClient(mongoDbSettings.GetConnectionString()));
        serviceCollection.AddScoped<DndDatabase>(sp =>
        {
            var client = sp.GetService<IMongoClient>()!;
            var database = client.GetDatabase(Constants.DATABASE_NAME);

            return new DndDatabase { Database = database };
        });
    }

    private static void RegisterClassMaps()
    {
        BsonSerializer.RegisterSerializer(new EnumSerializer<RaceType>(BsonType.String));
        BsonSerializer.RegisterSerializer(new EnumSerializer<ClassType>(BsonType.String));
        BsonSerializer.RegisterSerializer(new EnumSerializer<CharacterAlignmentType>(BsonType.String));
        BsonSerializer.RegisterSerializer(new EnumSerializer<CharacterSkillType>(BsonType.String));
        BsonSerializer.RegisterSerializer(new EnumSerializer<CharacterAbilityType>(BsonType.String));
        BsonSerializer.RegisterSerializer(new EnumSerializer<ArmorType>(BsonType.String));
        BsonSerializer.RegisterSerializer(new EnumSerializer<WeaponAttackType>(BsonType.String));
        BsonSerializer.RegisterSerializer(new EnumSerializer<WeaponDamageType>(BsonType.String));
        BsonSerializer.RegisterSerializer(new EnumSerializer<WeaponProficiencyType>(BsonType.String));
        BsonSerializer.RegisterSerializer(new EnumSerializer<WeaponProperty>(BsonType.String));
        BsonSerializer.RegisterSerializer(new EnumSerializer<AccessType>(BsonType.String));
        BsonSerializer.RegisterSerializer(new DiceMongoSerializer());

        BsonClassMap.RegisterClassMap<Character>(cm =>
        {
            cm.AutoMap();
            cm.MapIdProperty(x => x.Id);
            cm.MapMember(x => x.InGameStats)
                .SetIgnoreIfNull(ignoreIfNull: true);
        });

        BsonClassMap.RegisterClassMap<CharacterPersonality>(cm =>
        {
            cm.AutoMap();

            cm.MapProperty(x => x.Image)
                .SetIgnoreIfNull(ignoreIfNull: true);

            cm.MapProperty(x => x.Name)
                .SetDefaultValue(string.Empty);
        });

        BsonClassMap.RegisterClassMap<RaceName>(cm =>
        {
            cm.AutoMap();
            cm.MapProperty(x => x.SubRaceName)
                .SetIgnoreIfNull(true);
        });

        BsonClassMap.RegisterClassMap<ClassFeature>(cm =>
        {
            cm.AutoMap();
            cm.MapProperty(x => x.ClassFeatureMastery)
                .SetIgnoreIfNull(true);
        });

        BsonClassMap.RegisterClassMap<InventoryItem>(cm =>
        {
            cm.AutoMap();
            cm.MapMember(x => x.Item)
                .SetIsRequired(true);
        });

        BsonClassMap.RegisterClassMap<Race>(cm =>
        {
            cm.AutoMap();
            cm.MapIdProperty(x => x.Id)
                .SetIsRequired(true);
            cm.MapMember(x => x.SubRacesAdjustments);
        });

        BsonClassMap.RegisterClassMap<Class>(cm =>
        {
            cm.AutoMap();
            cm.MapIdProperty(x => x.Id)
                .SetIsRequired(true);
        });

        BsonClassMap.RegisterClassMap<Party>(cm =>
        {
            cm.AutoMap();
            cm.MapIdProperty(x => x.Id)
                .SetIsRequired(true);
        });

        BsonClassMap.RegisterClassMap<RaceTraitDescriptor>(cm =>
        {
            cm.AutoMap();
            cm.MapProperty(x => x.Options)
                .SetIgnoreIfNull(true);
        });

        BsonClassMap.RegisterClassMap<Item>(cm =>
        {
            cm.AutoMap();
            cm.SetIsRootClass(true);
            cm.AddKnownType(typeof(Weapon));
            cm.AddKnownType(typeof(Armor));
            cm.AddKnownType(typeof(Item));
        });
    }

    private static void AddRepositories(IServiceCollection services)
    {
        services.AddScoped(serviceProvider =>
        {
            var context = serviceProvider.GetRequiredService<DndDatabase>();
            return context.Database.GetCollection<Character>(Constants.CHARACTER_COLLECTION_NAME);
        });

        services.AddScoped(serviceProvider =>
        {
            var context = serviceProvider.GetRequiredService<DndDatabase>();
            return context.Database.GetCollection<Party>(Constants.PARTIES_COLLECTION_NAME);
        });

        services.AddScoped(serviceProvider =>
        {
            var context = serviceProvider.GetRequiredService<DndDatabase>();
            return context.Database.GetCollection<Race>(Constants.RACES_COLLECTION_NAME);
        });

        services.AddScoped(serviceProvider =>
        {
            var context = serviceProvider.GetRequiredService<DndDatabase>();
            return context.Database.GetCollection<Class>(Constants.CLASSES_COLLECTION_NAME);
        });

        services.AddScoped(serviceProvider =>
        {
            var context = serviceProvider.GetRequiredService<DndDatabase>();
            return context.Database.GetCollection<Item>(Constants.ITEMS_COLLECTION_NAME);
        });
    }
}
