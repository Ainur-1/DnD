﻿using Domain.Entities.Races;
using Domain.Exceptions;
using HotChocolate.Authorization;
using HotChocolate.Data;
using MongoDB.Driver;

namespace DnD.GraphQL.Queries;

[ExtendObjectType("Query")]
public class RaceQuery
{
    [AllowAnonymous]

    public IExecutable<Race> GetRaces([Service] IMongoCollection<Race> races) => races.AsExecutable();

    [AllowAnonymous]
    [Error(typeof(ObjectNotFoundException))]
    public async Task<Race> GetRaceInfoAsync([Service] IMongoCollection<Race> races, RaceType id)
    {
        var race = await races.Find(x => x.Id == id).SingleOrDefaultAsync() ?? throw new ObjectNotFoundException();

        return race;
    } 
}
