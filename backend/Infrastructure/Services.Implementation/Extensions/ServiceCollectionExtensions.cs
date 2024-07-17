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
                configuration["Smtp:Server"] ?? throw new InvalidOperationException("Provide smtp settings"),
                int.Parse(configuration["Smtp:Port"] ?? throw new InvalidOperationException("Provide rabbitmq settings")),
                configuration["Smtp:User"] ?? throw new InvalidOperationException("Provide smtp settings"),
                configuration["Smtp:Pass"] ?? throw new InvalidOperationException("Provide smtp settings")
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
                    h.Username(rabbitMqSettings["Username"] ?? throw new InvalidOperationException("Provide rabbitmq settings"));
                    h.Password(rabbitMqSettings["Password"] ?? throw new InvalidOperationException("Provide rabbitmq settings"));
                });

                cfg.ConfigureEndpoints(ctx);
            });
        });

        return serviceCollection;
    }
}
