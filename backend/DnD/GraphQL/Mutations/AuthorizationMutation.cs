using DnD.GraphQL.Errors;
using HotChocolate.Authorization;
using Services.Abstractions;

namespace DnD.GraphQL.Mutations;

[ExtendObjectType("Mutation")]
public class AuthorizationMutation
{

    [Error(typeof(FieldNameTakenError))]
    [Error(typeof(InvalidArgumentValueError))]
    [AllowAnonymous]
    public async Task<bool> SignUpAsync([Service] IUserService userService, string email, string username, string password, string? name = default)
    {
        await userService.CreateAsync(email, username, password, name);

        return true;
    }

    public async Task<bool> SignOutAsync([Service] IAuthorizationService authorizationService)
    {
        return await authorizationService.SignOutAsync();
    }

    [AllowAnonymous]
    public async Task<Guid?> SignInAsync([Service] IAuthorizationService authorizationService, string login, string password, bool rememberMe)
    {
        return await authorizationService.SignInAsync(login, password, rememberMe);
    }


    [AllowAnonymous]
    public async Task<bool> RequestPasswordResetAsync([Service] IUserService userService, string email)
    {
        await userService.SendPasswordResetCodeAsync(email);
        return true;
    }
    [AllowAnonymous]
    public async Task<bool> ResetPasswordAsync([Service] IUserService userService, string email, string code, string newPassword)
    {
        await userService.ResetPasswordAsync(email, code, newPassword);
        return true;
    }
    public async Task<bool> ChangePasswordAsync([Service] IUserService userService, string userId, string newPassword)
    {
        await userService.ChangePasswordAsync(userId, newPassword);
        return true;
    }
}