using Mappings;
using Microsoft.Extensions.DependencyInjection;
using Service.Abstractions;
using Services.Abstractions;

namespace Services.Implementation.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddDomainServicesImplementations(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddScoped<IAuthorizationService, UserManagementService>();
        serviceCollection.AddScoped<IUserService, UserManagementService>();
        serviceCollection.AddScoped<IPartyService, PartyService>();
        serviceCollection.AddScoped<ICharacterService, CharacterService>();

        serviceCollection.AddEntitiesMapping();


        return serviceCollection;
    }
}
