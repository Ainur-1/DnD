using Microsoft.AspNetCore.Identity;

namespace DnD.Areas.Identity.Data;

public class User: IdentityUser
{
    public string? Name { get; set; }
    
}
