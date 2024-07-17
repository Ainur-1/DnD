using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

namespace Domain.Entities.User;

[CollectionName("Roles")]
public class UserRole : MongoIdentityRole<Guid>
{

}
