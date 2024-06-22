using Domain.Entities;
using Newtonsoft.Json;

namespace Domain.Extensions.Serialization;

public class DiceJsonConverter : JsonConverter<Dice>
{
    private const string ERROR_MESSAGE = "Unknown value for enum Dice. Forgot to register one in converter?";

    private static readonly IReadOnlyDictionary<Dice, string> _enumToString = new Dictionary<Dice, string>()
    {
        [Dice.OneD1] = "1d1",
        [Dice.OneD2] = "1d2",
        [Dice.OneD3] = "1d3",
        [Dice.OneD4] = "1d4",
        [Dice.OneD6] = "1d6",
        [Dice.OneD8] = "1d8",
        [Dice.OneD10] = "1d10",
        [Dice.OneD12] = "1d12",
        [Dice.TwoD6] = "2d6",
    };

    private static readonly IReadOnlyDictionary<string, Dice> _stringToEnum = _enumToString
                                                                       .Select(keyValue => new KeyValuePair<string, Dice>(keyValue.Value, keyValue.Key))
                                                                       .ToDictionary();

    public override Dice ReadJson(JsonReader reader, Type objectType, Dice existingValue, bool hasExistingValue, JsonSerializer serializer)
    {
        if (reader.TokenType != JsonToken.String)
            throw new JsonSerializationException(ERROR_MESSAGE);

        var stringValue = reader.Value.ToString();
        if (_stringToEnum.TryGetValue(stringValue, out var dice))
        {
            return dice;
        }

        throw new JsonSerializationException(ERROR_MESSAGE);
    }

    public override void WriteJson(JsonWriter writer, Dice value, JsonSerializer serializer)
    {
        if (_enumToString.TryGetValue(value, out var stringValue))
        {
            writer.WriteValue(stringValue);
            return;
        }

        throw new JsonSerializationException(ERROR_MESSAGE);
    }
}