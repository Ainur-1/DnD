using DataAccess.DependencyInjection;
using DnD.Data;
using DnD.GraphQL;
using Services.Implementation.Extensions;
using MassTransit;
using static DnD.Data.WebApplicationExtensions;
using DnD.Extensions;

namespace DnD;

public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        var configuration = builder.Configuration;
        var services = builder.Services;
        var mongoDbSettings = configuration.GetSection(nameof(MongoDbSettings))?.Get<MongoDbSettings>()
            ?? throw new ArgumentNullException($"Provide {nameof(MongoDbSettings)}.");

        if (builder.Environment.IsDevelopment())
        {
            services.AddCors(options =>
            {
                var allowHosts = configuration.GetValue<string>("CorsHost") ?? "http://localhost:3000";
                options.AddPolicy("DevFrontEnds",
                    builder =>
                        builder.WithOrigins(allowHosts)
                               .AllowAnyMethod()
                               .AllowAnyHeader()
                               .AllowCredentials()
                            .AllowAnyHeader()
                );
            });
        }

        services.AddSignalR();
        services.AddGraphQlApi();
        services.AddControllers();
        builder.AddLogger(configuration);
        services.AddAuthorizationOnIdentity(mongoDbSettings);
        services.RegisterDatabaseServices(mongoDbSettings);
        services.AddDomainServicesImplementations(configuration);

        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.UseCors("DevFrontEnds");
        }

        app.UseRouting()
           .UseAuthentication()
           .UseAuthorization();

        app.MapHub<GameHub.GameHub>("/gamehub");
        app.MapControllers();
        app.MapGraphQL();

        if (configuration.IsDataSeedRequested())
        {
            await app.MigrateDatabaseAsync();
        }

        await app.RunAsync();
    }
}