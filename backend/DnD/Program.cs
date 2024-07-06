using DataAccess;
using DataAccess.DependencyInjection;
using DnD.Areas.Identity.Data;
using DnD.Areas.Identity.Pages.Account;
using DnD.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Domain.Entities.User;
using Microsoft.AspNetCore.Components.Server.Circuits;
using Microsoft.Extensions.DependencyInjection.Extensions;
using GameHub.blazor;
using DataAccess;
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
        services.AddRazorPages();
        services.AddTransient<IEmailSender, EmailSender>();
        builder.Services.AddServerSideBlazor();
        
        services.TryAddEnumerable(ServiceDescriptor.Scoped<CircuitHandler, InitializeCircuitHandler>());
        services.AddScoped<HubConnectionService>();

        services.RegisterDatabaseServices(mongoDbSettings);
        services.AddMongoCollections();

        builder.Services.AddRazorPages();

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
        app.UseStaticFiles();

        app.MapBlazorHub();
        app.MapFallbackToPage("/_Host");

        app.MapHub<GameHub.GameHub>("/gamehub");


        app.MapGraphQL();
        app.MapRazorPages();

        if (configuration.IsDataSeedRequested())
        {
            await app.MigrateDatabaseAsync();
        }

        await app.RunAsync();
    }
}