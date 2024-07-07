using DnD.GraphQL.Errors;
using Services.Abstractions;

namespace DnD.GraphQL.Mutations;

[ExtendObjectType("Mutation")]
public class AuthorizationMutation
{

    [Error(typeof(FieldNameTakenError))]
    [Error(typeof(InvalidArgumentValueError))]
    public async Task<bool> SignUpAsync([Service] IUserService userService, string email, string username, string password, string? name = default)
    {
        await userService.CreateAsync(email, username, password, name);

        return true;
    }

    public async Task<bool> SignOutAsync([Service] IAuthorizationService authorizationService)
    {
        return await authorizationService.SignOutAsync();
    }

    public async Task<Guid?> SignInAsync([Service] IAuthorizationService authorizationService, string login, string password, bool rememberMe)
    {
        return await authorizationService.SignInAsync(login, password, rememberMe);
    }
}