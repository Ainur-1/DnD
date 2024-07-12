using Domain.Entities.Classes;
using Domain.Exceptions;
using HotChocolate.Data;
using MongoDB.Driver;

namespace DnD.GraphQL.Queries;

[ExtendObjectType("Query")]
public class ClassQuery
{
    public IExecutable<Class> GetClasses([Service] IMongoCollection<Class> classes) => classes.AsExecutable();

    [Error(typeof(ObjectNotFoundException))]
    public async Task<Class> GetClassInfo([Service] IMongoCollection<Class> classes, ClassType id)
    {
        var classInfo = await classes.Find(x => x.Id == id).SingleOrDefaultAsync() ?? throw new ObjectNotFoundException();

        return classInfo;
    }
}
