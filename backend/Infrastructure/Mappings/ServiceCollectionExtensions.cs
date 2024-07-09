using Microsoft.Extensions.DependencyInjection;

namespace Mappings;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddEntitiesMapping(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddAutoMapper(AssemblyReference.Reference);

        return serviceCollection;
    }
}
