using Mappings;
using MassTransit;
using Microsoft.Extensions.DependencyInjection;
using Service.Abstractions;
using Services.Abstractions;
using Services.Implementation.Consumers.Characters;
using Services.Implementation.Consumers.Email;

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

        serviceCollection.AddMassTransit(x =>
        {
            x.AddConsumer<EmailSendCommandConsumer>();
            x.AddConsumer<CharacterUpdatedEventConsumer>();

            x.UsingInMemory((ctx, cfg) => 
            {
                cfg.ConfigureEndpoints(ctx);
            });
        });

        return serviceCollection;
    }
}
