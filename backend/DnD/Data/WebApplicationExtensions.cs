using DataAccess;
using Domain.Entities.Classes;
using Domain.Entities.Game.Items;
using Domain.Entities.Races;
using Domain.Extensions.Serialization;
using Newtonsoft.Json;
using Path = System.IO.Path;

namespace DnD.Data;

public static class WebApplicationExtensions
{
    private const string VARIABLE_NAME = "EnableDataSeed";

    private const string DATASEED_FILE = "dataSeed.json";

    public static bool IsDataSeedRequested(this IConfiguration configuration)
    {
        var dataSeedEnabled = configuration.GetValue<bool?>(VARIABLE_NAME);

        return dataSeedEnabled.HasValue && dataSeedEnabled.Value;
    }

    public static async Task MigrateDatabaseAsync(this WebApplication application)
    {
        await using var scope = application.Services.CreateAsyncScope();
        var serviceProvider = scope.ServiceProvider;
        try
        {
            var database = serviceProvider.GetService<DndDatabase>()?.Database ?? throw new NotImplementedException("Could not resolve database.");

            const string CLASS_COLLECTION = Constants.CLASSES_COLLECTION_NAME;
            const string ITEM_COLLECTION = Constants.ITEMS_COLLECTION_NAME;
            const string RACE_COLLECTION = Constants.RACES_COLLECTION_NAME;
            const string CHARACTER_COLLECTION = Constants.CHARACTER_COLLECTION_NAME;
            const string PARTY_COLLECTION = Constants.PARTIES_COLLECTION_NAME;

            await Task.WhenAll(
                database.DropCollectionAsync(CLASS_COLLECTION),
                database.DropCollectionAsync(ITEM_COLLECTION),
                database.DropCollectionAsync(RACE_COLLECTION),
                database.DropCollectionAsync(CHARACTER_COLLECTION),
                database.DropCollectionAsync(PARTY_COLLECTION)
            );

            await Task.WhenAll(
                database.CreateCollectionAsync(CLASS_COLLECTION),
                database.CreateCollectionAsync(ITEM_COLLECTION),
                database.CreateCollectionAsync(RACE_COLLECTION),
                database.CreateCollectionAsync(CHARACTER_COLLECTION),
                database.CreateCollectionAsync(PARTY_COLLECTION)
                );

            var data = await GetDataSeedDtoAsync();

            var classesCollection = database.GetCollection<Class>(CLASS_COLLECTION);
            await classesCollection.InsertManyAsync(data.Classes);

            var racesCollection = database.GetCollection<Race>(RACE_COLLECTION);
            await racesCollection.InsertManyAsync(data.Races);

            var itemsCollection = database.GetCollection<Item>(ITEM_COLLECTION);
            await itemsCollection.InsertManyAsync(data.Items);
        }
        catch (Exception ex)
        {
            var logger = serviceProvider.GetService<ILogger>();
            const string pattern = "Error while database migrating on startup: {ex}.";

            if (logger == null)
                Console.Error.WriteLine(pattern.Replace("{ex}", ex.Message));
            else
                logger?.LogCritical(pattern, ex);

            Environment.Exit(1);
        }
    }

    private static async Task<DataSeed> GetDataSeedDtoAsync()
    {
        var pathToDataSeed = Path.Combine(Directory.GetCurrentDirectory(), "Data", DATASEED_FILE).ToString();
        var json = await File.ReadAllTextAsync(pathToDataSeed);

        var jsonSettings = new JsonSerializerSettings()
        {
            TypeNameHandling = TypeNameHandling.Auto,
            MaxDepth = 1024
        };

        var dataSeed = JsonConvert.DeserializeObject<DataSeed>(json, jsonSettings);

        return dataSeed ?? throw new InvalidOperationException("Could not find correct data seed.");
    }

    private class DataSeed
    {
        public IEnumerable<Class> Classes { get; set; } = Array.Empty<Class>();

        public IEnumerable<Race> Races { get; set; } = Array.Empty<Race>();

        public Item[] Items { get; set; } = Array.Empty<Item>();
    }
}