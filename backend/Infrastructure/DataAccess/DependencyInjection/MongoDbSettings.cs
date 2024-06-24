namespace DataAccess.DependencyInjection;

public record MongoDbSettings
{
    public string? Username { get; init; }

    public string? Password { get; init; }

    public string Host { get; init; } = "localhost";

    public int Port { get; init; } = 27017;

    public string GetConnectionString() => string.Format("mongodb://{0}{1}:{2}", NoCredentialsProvided() ? string.Empty : $"{Username}:{Password}@", Host, Port);

    private bool NoCredentialsProvided() => string.IsNullOrEmpty(Username) || string.IsNullOrEmpty(Password);
}
