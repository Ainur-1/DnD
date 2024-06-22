using System.Collections.Immutable;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Domain.Entities.Game.Items.Serialization;

public class ItemJsonConverter : JsonConverter<Item>
{
    private readonly static Type itemType = typeof(Item);

    private readonly static IEnumerable<Type> knownItemsTypes = itemType.Assembly
                                                                       .GetTypes()
                                                                       .Where(type => type.IsAssignableFrom(itemType))
                                                                       .Where(type => type != itemType)
                                                                       .ToImmutableArray();
    private const string UNKNOWNTYPE_MESSAGE = "Unknown item type";

    public override Item Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        using var doc = JsonDocument.ParseValue(ref reader);
        var root = doc.RootElement;

        if (root.TryGetProperty(nameof(Item.ItemType), out var itemTypeElement))
        {
            var typeName = itemTypeElement.GetString();
            var type = knownItemsTypes.FirstOrDefault(x => x.Name == typeName) ?? throw new NotSupportedException(UNKNOWNTYPE_MESSAGE);

            return JsonSerializer.Deserialize(root, type, options) as Item ?? throw new NotSupportedException(UNKNOWNTYPE_MESSAGE);
        }

        throw new NotSupportedException(UNKNOWNTYPE_MESSAGE);
    }

    public override void Write(Utf8JsonWriter writer, Item value, JsonSerializerOptions options)
    {
        JsonSerializer.Serialize(writer, value, options);
    }
}