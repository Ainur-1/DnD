using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

namespace DnD.Areas.Identity.Data;

[CollectionName("users")]
public class User: MongoIdentityUser<Guid>
{
    public string? Name { get; set; }
}
