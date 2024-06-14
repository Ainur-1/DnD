using Microsoft.AspNetCore.Identity;

namespace DnD.Areas.Identity.Data;

public class SampleUser: IdentityUser
{
    public string Name { get; set; }
    public string Nickname { get; set; }
    
}
