using Domain.Entities.Character;
using Domain.Entities.Classes;
using Domain.Entities.Races;
using Domain.Entities.Game.Items;
using HotChocolate.Data;
using MongoDB.Driver;
using Domain.Entities.Parties;

namespace DnD.GraphQL
{
    public class Query
    {
        [UseSorting]
        [UseFiltering]
        public IExecutable<CharacterPersonality> GetCharacters([Service] IMongoCollection<CharacterPersonality> collection)
        {
            return collection.AsExecutable();
        }

        [UseSorting]
        [UseFiltering]
        public IExecutable<Class> GetClasses([Service] IMongoCollection<Class> collection)
        {
            return collection.AsExecutable();
        }

        [UseSorting]
        [UseFiltering]
        public IExecutable<Item> GetItems([Service] IMongoCollection<Item> collection)
        {
            return collection.AsExecutable();
        }

        [UseSorting]
        [UseFiltering]
        public IExecutable<Party> GetParties([Service] IMongoCollection<Party> collection)
        {
            return collection.AsExecutable();
        }

        [UseSorting]
        [UseFiltering]
        public IExecutable<Race> GetRaces([Service] IMongoCollection<Race> collection)
        {
            return collection.AsExecutable();
        }
    }
}