using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using System.Reflection;

namespace Domain.Extensions.Serialization;

public class ProtectedSetContractResolver : DefaultContractResolver
{
    protected override JsonProperty CreateProperty(MemberInfo member, MemberSerialization memberSerialization)
    {
        var property = base.CreateProperty(member, memberSerialization);

        if (property.Writable || member is not PropertyInfo propInfo) return property;

        var setter = propInfo.GetSetMethod(true);
        if (setter != null)
        {
            property.Writable = true;
        }

        return property;
    }
}