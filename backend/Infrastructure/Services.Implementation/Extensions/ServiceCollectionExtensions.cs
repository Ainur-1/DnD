using Mappings;
using MassTransit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Service.Abstractions;
using Services.Abstractions;
using Services.Implementation.Consumers.Characters;
using Services.Implementation.Consumers.Email;
using Services.Implementation.LoggerDecarator;
using Services.Implementation.LoggerDecorator;

namespace Services.Implementation.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddDomainServicesImplementations(this IServiceCollection serviceCollection, IConfiguration configuration)
    {
        serviceCollection.AddScoped<IAuthorizationService, AuthorizationWithLogDecorator>();
        serviceCollection.AddScoped<IUserService, UserWithLogDecorator>();
        serviceCollection.AddScoped<IPartyService, PartyWithLogDecorator>();
        serviceCollection.AddScoped<ICharacterService, CharacterWithLogDecorator>();
        serviceCollection.AddScoped<IInventoryService, InventoryWithLogDecorator>();
        serviceCollection.AddScoped<CharacterService>();
        serviceCollection.AddScoped<PartyService>();
        serviceCollection.AddScoped<UserManagementService>();
        serviceCollection.AddScoped<InventoryService>();

        serviceCollection.AddTransient<IEmailService>(provider =>
            new EmailService(
                configuration["Smtp:Server"],
                int.Parse(configuration["Smtp:Port"]),
                configuration["Smtp:User"],
                configuration["Smtp:Pass"]
            ));

        serviceCollection.AddEntitiesMapping();

        serviceCollection.AddMassTransit(x =>
        {
            x.AddConsumer<EmailSendCommandConsumer>();
            x.AddConsumer<CharacterUpdatedEventConsumer>();

            x.UsingRabbitMq((ctx, cfg) =>
            {
                var rabbitMqSettings = configuration.GetSection("RabbitMqSettings");
                cfg.Host(rabbitMqSettings["Host"], "/", h =>
                {
                    h.Username(rabbitMqSettings["Username"]);
                    h.Password(rabbitMqSettings["Password"]);
                });

                cfg.ConfigureEndpoints(ctx);
            });


        }
        );

        return serviceCollection;
    }
}
