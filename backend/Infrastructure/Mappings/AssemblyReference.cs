using System.Reflection;

namespace Mappings;

public static class AssemblyReference
{
    public static Assembly Reference => typeof(AssemblyReference).Assembly; 
}
