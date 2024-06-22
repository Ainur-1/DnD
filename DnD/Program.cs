using DataAccess.DependencyInjection;
using DnD.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using DnD.Areas.Identity.Data;
using DataAccess;
using Microsoft.AspNetCore.Identity.UI.Services;
using DnD.Areas.Identity.Pages.Account;
using AspNetCore.Identity.MongoDbCore.Models;

namespace DnD;

public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        var configuration = builder.Configuration;
        var services = builder.Services;
      
        services
                .AddIdentity<User, UserRole>(options =>
                {
                    options.SignIn.RequireConfirmedEmail = false; 
                    options.SignIn.RequireConfirmedAccount = false;
                })
                .AddMongoDbStores<User, UserRole, Guid>(mongoDbSettings.ConnectionString, mongoDbSettings.Name)
                .AddDefaultTokenProviders()
                .AddDefaultUI();

        services.AddRazorPages();
        services.AddTransient<IEmailSender, EmailSender>();      
      

        services.RegisterDatabaseServices(configuration.GetSection(nameof(MongoDbSettings))?.Get<MongoDbSettings>() ?? throw new ArgumentNullException($"Provide {nameof(MongoDbSettings)}."));

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
