using Newtonsoft.Json;

namespace Domain.Extensions.Serialization;

internal abstract class MapJsonConverter<T> : JsonConverter<T>
{
    protected abstract IReadOnlyDictionary<T, string> ToStringMap { get; }

    protected abstract IReadOnlyDictionary<string, T> FromStringMap { get; }

    protected static IReadOnlyDictionary<string, T> GetReverseMap(IReadOnlyDictionary<T, string> toStringMap)
        => toStringMap
        .Select(keyValue => new KeyValuePair<string, T>(keyValue.Value, keyValue.Key))
        .ToDictionary();

    public override T ReadJson(JsonReader reader, Type objectType, T existingValue, bool hasExistingValue, JsonSerializer serializer)
    {
        if (reader.TokenType != JsonToken.String)
            throw new JsonSerializationException(GetErrorMessage());

        var stringValue = reader.Value.ToString();
        if (FromStringMap.TryGetValue(stringValue, out var value))
        {
            return value;
        }

        throw new JsonSerializationException(GetErrorMessage());
    }

    public override void WriteJson(JsonWriter writer, T value, JsonSerializer serializer)
    {
        if (ToStringMap.TryGetValue(value, out var stringValue))
        {
            writer.WriteValue(stringValue);
            return;
        }

        throw new JsonSerializationException(GetErrorMessage());
    }

    private string GetErrorMessage() => $"Unknown value for {typeof(T)}. Forgot to register one in map?";
}
