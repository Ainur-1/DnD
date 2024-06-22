using AspNetCore.Identity.MongoDbCore.Models;
using Microsoft.AspNetCore.Identity;
using MongoDbGenericRepository.Attributes;

namespace DnD.Areas.Identity.Data;

[CollectionName("Users")]
public class User: MongoIdentityUser<Guid>
{
    public string? Name { get; set; }
}
