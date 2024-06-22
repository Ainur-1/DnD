using Domain.Entities;
using Newtonsoft.Json;

namespace Domain.Extensions.Serialization;

public class DiceJsonConverter : JsonConverter<Dice>
{
    private const string ERROR_MESSAGE = "Unknown value for enum Dice. Forgot to register one?";

    public override Dice ReadJson(JsonReader reader, Type objectType, Dice existingValue, bool hasExistingValue, JsonSerializer serializer)
    {
        if (reader.TokenType != JsonToken.String)
            throw new JsonSerializationException(ERROR_MESSAGE);

        var stringValue = reader.Value.ToString();
        if (DiceToStringMapping.StringToDiceMap.TryGetValue(stringValue, out var dice))
        {
            return dice;
        }

        throw new JsonSerializationException(ERROR_MESSAGE);
    }

    public override void WriteJson(JsonWriter writer, Dice value, JsonSerializer serializer)
    {
        if (DiceToStringMapping.DiceToStringMap.TryGetValue(value, out var stringValue))
        {
            writer.WriteValue(stringValue);
            return;
        }

        throw new JsonSerializationException(ERROR_MESSAGE);
    }
}