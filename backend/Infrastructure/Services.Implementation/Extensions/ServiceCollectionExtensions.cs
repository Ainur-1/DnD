using Microsoft.Extensions.DependencyInjection;
using Services.Abstractions;

namespace Services.Implementation.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddDomainServicesImplementations(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddScoped<IAuthorizationService, UserManagementService>();
        serviceCollection.AddScoped<IUserService, UserManagementService>();

        return serviceCollection;
    }
}
