using System.Collections.Immutable;
using Domain.Entities.Game.Items;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Domain.Extensions.Serialization;

public class ItemJsonConverter : JsonConverter<Item>
{
    private const string UNKNOWNTYPE_MESSAGE = "Unknown item type.";


    private readonly static Type itemType = typeof(Item);

    private readonly static IEnumerable<Type> knownItemsTypes = itemType.Assembly
                                                                       .GetTypes()
                                                                       .Where(type => type.IsAssignableTo(itemType))
                                                                       .Where(type => type != itemType)
                                                                       .ToImmutableArray();

    public override void WriteJson(JsonWriter writer, Item? value, JsonSerializer serializer)
    {
        var jObject = JObject.FromObject(value, serializer);
        jObject.WriteTo(writer);
    }

    public override Item? ReadJson(JsonReader reader, Type objectType, Item? existingValue, bool hasExistingValue, JsonSerializer serializer)
    {
        var jObject = JObject.Load(reader);

        if (jObject.TryGetValue(nameof(Item.ItemType), out var itemTypeToken))
        {
            var typeName = itemTypeToken.ToString();
            var type = knownItemsTypes.FirstOrDefault(x => x.Name == typeName) ?? throw new NotSupportedException(UNKNOWNTYPE_MESSAGE);

            //todo: not optimal to parse string and then ToString() and call global deserializer
            return JsonConvert.DeserializeObject(jObject.Root.ToString(), type, new JsonSerializerSettings
            {
                ContractResolver = new ProtectedSetContractResolver()
            }) as Item ?? throw new NotSupportedException(UNKNOWNTYPE_MESSAGE);
        }

        throw new NotSupportedException(UNKNOWNTYPE_MESSAGE);
    }
}