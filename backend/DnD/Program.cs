using DataAccess;
using DataAccess.DependencyInjection;
using DnD.Data;
using Microsoft.AspNetCore.Identity;
using Domain.Entities.User;
using DnD.GraphQL;
using DnD.GraphQL.Services;

namespace DnD;

public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        var configuration = builder.Configuration;
        var services = builder.Services;

        var mongoDbSettings = configuration.GetSection(nameof(MongoDbSettings))?.Get<MongoDbSettings>() ?? throw new ArgumentNullException($"Provide {nameof(MongoDbSettings)}.");

        services
                .AddIdentity<User, UserRole>(options =>
                {
                    options.SignIn.RequireConfirmedEmail = false;
                    options.SignIn.RequireConfirmedAccount = false;
                })
                .AddMongoDbStores<User, UserRole, Guid>(mongoDbSettings.GetConnectionString(), Constants.DATABASE_NAME)
                .AddDefaultTokenProviders()
                .AddDefaultUI();

        services.AddSignalR();
        services.RegisterDatabaseServices(mongoDbSettings);
        services.AddMongoCollections();

        if (builder.Environment.IsDevelopment())
        {
            services.AddCors(options =>
            {
                var allowHosts = configuration.GetValue<string[]>("CorsHost") ?? ["http://localhost:3000"];
                options.AddPolicy("DevFrontEnds",
                    builder =>
                        builder.WithOrigins(allowHosts)
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials()
                            .SetIsOriginAllowed(origin => true)
                );
            });
        }

        builder.Services.AddGraphQLServer()
            .AddGraphQLServer()
            .AddQueryType<Query>()
            .AddMutationType<Mutation>()
            .AddFiltering()
            .AddSorting();

        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.UseCors("DevFrontEnds");
        }

        app.UseRouting();
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapHub<GameHub.GameHub>("/gamehub");
        app.MapGraphQL();

        if (configuration.IsDataSeedRequested())
        {
            await app.MigrateDatabaseAsync();
        }

        await app.RunAsync();
    }
}