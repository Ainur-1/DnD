using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

namespace Domain.Entities.User;

[CollectionName("users")]
public class User: MongoIdentityUser<Guid>
{
    public string? Name { get; set; }
}
