using DnD.GraphQL.Mutations;
using DnD.GraphQL.Queries;

namespace DnD.GraphQL;

public static class ServiceCollectionExtensions
{
    public static void AddGraphQlApi(this IServiceCollection services)
    {
        services
            .AddGraphQLServer()
            .AddMutationConventions(applyToAllMutations: true)
            .AddQueryType(x => x.Name("Query"))
                .AddTypeExtension<SampleQuery>()
            .AddMutationType(x => x.Name("Mutation"))
                .AddTypeExtension<AuthorizationMutation>()
            .AddFiltering()
            .AddSorting();
    }
}
