using DataAccess.DependencyInjection;
using DnD.Data;
using Microsoft.AspNetCore.Identity;
using DnD.Areas.Identity.Data;
using DataAccess;
using Microsoft.AspNetCore.Identity.UI.Services;
using DnD.Areas.Identity.Pages.Account;

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

        services.AddRazorPages();
        services.AddTransient<IEmailSender, EmailSender>();


        services.RegisterDatabaseServices(mongoDbSettings);

        builder.Services.AddRazorPages();

        var app = builder.Build();

        app.UseRouting();
        app.UseAuthentication();
        app.UseAuthorization();
        
        app.MapRazorPages();

        if (configuration.IsDataSeedRequested())
        {
            await app.MigrateDatabaseAsync();
        }

        await app.RunAsync();
    }
}
