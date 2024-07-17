using DataAccess;
using DataAccess.DependencyInjection;
using Domain.Entities.User;
using Microsoft.AspNetCore.Identity;
using Serilog.Events;
using Serilog;
using System.Security.Claims;

namespace DnD.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddAuthorizationOnIdentity(this IServiceCollection serviceCollection, MongoDbSettings mongoDbSettings)
    {
        serviceCollection
            .AddIdentity<User, UserRole>(options =>
            {
                options.SignIn.RequireConfirmedEmail = true;
                options.SignIn.RequireConfirmedAccount = true;
                options.User.RequireUniqueEmail = true;
                options.User.AllowedUserNameCharacters = new string(Enumerable.Range(65, 25)
                    .Select(upperEnglishLetterCode => (char)upperEnglishLetterCode)
                    .Concat(Enumerable.Range(97, 25)
                        .Select(lowerEnglishLetterCode => (char)lowerEnglishLetterCode)
                    )
                    .Concat(Enumerable.Range(48, 10)
                        .Select(numberCode => (char)numberCode)
                    )
                    .Concat(['_', '.', '@',])
                    .ToArray()
                );
                options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier;
            })
            .AddMongoDbStores<User, UserRole, Guid>(mongoDbSettings.GetConnectionString(), Constants.DATABASE_NAME)
            .AddDefaultTokenProviders();

        return serviceCollection;
    }

    public static IServiceCollection AddLogger(this WebApplicationBuilder builder, IConfiguration configuration)
    {
        Log.Logger = new LoggerConfiguration()
            .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
            .Enrich.FromLogContext()
            .WriteTo.Console()
            .WriteTo.PostgreSQL(
                connectionString: configuration.GetConnectionString("LogsPostgresql"),
                tableName: "DnDServiceLogger",
                needAutoCreateTable: true)
            .CreateLogger();

        builder.Host.UseSerilog();

        builder.Services.AddLogging(x => x.AddConsole().AddDebug());

        return builder.Services;
    }
}
