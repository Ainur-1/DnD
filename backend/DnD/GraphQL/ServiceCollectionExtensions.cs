using DnD.GraphQL.Mutations;
using DnD.GraphQL.Queries;

namespace DnD.GraphQL;

public static class ServiceCollectionExtensions
{
    public static void AddGraphQlApi(this IServiceCollection services)
    {
        services
            .AddGraphQLServer()
            .AddAuthorization()
            .AddMutationConventions(applyToAllMutations: true)
            .AddQueryType(x => x.Name("Query"))
                .AddTypeExtension<PartyQuery>()
                .AddTypeExtension<CharacterQuery>()
                .AddTypeExtension<RaceQuery>()
                .AddTypeExtension<ClassQuery>()
                .AddTypeExtension<InventoryQuery>()
            .AddMutationType(x => x.Name("Mutation"))
                .AddTypeExtension<AuthorizationMutation>()
                .AddTypeExtension<PartyMutation>()
                .AddTypeExtension<CharacterMutation>()
            .AddFiltering();
    }
}
