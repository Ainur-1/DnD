using AspNetCore.Identity.MongoDbCore.Models;
using Microsoft.AspNetCore.Identity;
using MongoDbGenericRepository.Attributes;

namespace DnD.Areas.Identity.Data;

[CollectionName("Roles")]
public class UserRole : MongoIdentityRole<Guid>
{

}
