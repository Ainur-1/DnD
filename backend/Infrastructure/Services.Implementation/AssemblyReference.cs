using System.Reflection;

namespace Services.Implementation;

public static class AssemblyReference
{
    public static readonly Assembly Reference = typeof(AssemblyReference).Assembly; 
}
