using Domain.Entities;
using Domain.Extensions.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;

namespace DataAccess.DependencyInjection.Serialization;

internal class DiceMongoSerializer : IBsonSerializer<Dice>
{
    public Type ValueType => typeof(Dice);

    public Dice Deserialize(BsonDeserializationContext context, BsonDeserializationArgs args)
    {
        var bsonType = context.Reader.GetCurrentBsonType();
        switch (bsonType)
        {
            case BsonType.String:
                var enumValue = context.Reader.ReadString();

                if (!DiceToStringMapping.StringToDiceMap.TryGetValue(enumValue, out var dice))
                {
                    throw new ArgumentOutOfRangeException($"{nameof(Dice)} {enumValue} is not presented in map. Forgot to add to map?");
                }

                return DiceToStringMapping.StringToDiceMap[enumValue];
            case BsonType.Int32:
                var enumIntValue = context.Reader.ReadInt32();
                return (Dice)enumIntValue;
            default:
                throw new NotSupportedException($"Cannot deserialize a {bsonType} to {nameof(Dice)}.");
        }
    }

    object IBsonSerializer.Deserialize(BsonDeserializationContext context, BsonDeserializationArgs args) => Deserialize(context, args);

    public void Serialize(BsonSerializationContext context, BsonSerializationArgs args, Dice value)
    {
        if (!DiceToStringMapping.DiceToStringMap.TryGetValue(value, out var diceString))
        {
            throw new ArgumentOutOfRangeException($"{nameof(Dice)} {value} is not presented in map. Forgot to add to map?");
        }

        context.Writer.WriteString(diceString);
    }

    public void Serialize(BsonSerializationContext context, BsonSerializationArgs args, object value)
    {
        if (value is Dice)
        {
            Serialize(context, args, (Dice)value);
        }
        else
        {
            throw new NotImplementedException();
        }
    }
}
