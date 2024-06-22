using DataAccess.DependencyInjection;
using DnD.Data;

namespace DnD;

public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        var configuration = builder.Configuration;
        var services = builder.Services;

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
