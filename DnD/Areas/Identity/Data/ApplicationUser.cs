using Microsoft.AspNetCore.Identity;

namespace DnD.Areas.Identity.Data;

public class ApplicationUser: IdentityUser
{
    public string? Name { get; set; }
    
}
