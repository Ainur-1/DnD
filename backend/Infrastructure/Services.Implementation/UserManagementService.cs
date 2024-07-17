using Domain.Entities.User;
using Domain.Exceptions;
using Microsoft.AspNetCore.Identity;
using Services.Abstractions;
using System.Web;
using MassTransit;
using Services.Implementation.Consumers.Email;
using Microsoft.Extensions.Configuration;
namespace Services.Implementation;

public class UserManagementService : IUserService, IAuthorizationService
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly IEmailService _emailService;
    private readonly IBus _bus;
    private readonly IConfiguration _configuration;

    public UserManagementService(
        UserManager<User> userManager, 
        SignInManager<User> signInManager, 
        IEmailService emailService,
        IBus bus,
        IConfiguration configuration)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _emailService = emailService;
        _bus = bus;
        _configuration = configuration;
    }

    public async Task CreateAsync(string email, string username, string password, string? name = null)
    {
        //todo: validate arguments

        var user = new User
        {
            UserName = username,
            Email = email,
            Name = name
        };

        var result = await _userManager.CreateAsync(user, password);

        if (result.Succeeded)
        {
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var encodedToken = HttpUtility.UrlEncode(token);
            var baseUrl = _configuration["AppSettings:BaseUrl"];
            var controlleremail = _configuration["AppSettings:EmailConfirmationUri"];
            var confirmationLink = $"{baseUrl}{controlleremail}?userId={user.Id}&token={encodedToken}";
            var subject = "Подтверждение регистрации";
            var message = $@"
                <html>
                <head>
                    <meta charset=""UTF-8"">
                    <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
                    <title>{subject}</title>
                    <style>
                        body {{
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            padding: 20px;
                        }}
                        .container {{
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #fff;
                            padding: 20px;
                            border-radius: 5px;
                            box-shadow: 0 0 10px rgba(0,0,0,0.1);
                        }}
                        h2 {{
                            color: #333;
                        }}
                        p {{
                            color: #666;
                        }}
                        .btn {{
                            display: inline-block;
                            background-color: #007bff;
                            color: WHITE !important;
                            text-decoration: none;
                            padding: 10px 20px;
                            border-radius: 5px;
                            margin-top: 15px;
                        }}
                        .btn:hover {{
                            background-color: #0056b3;
                        }}                        

                        
                    </style>
                </head>
                <body>
                    <div class='container'>
                        <h2>Здравствуйте, {username}!</h2>
                        <p>Спасибо за регистрацию на нашем сайте.</p>
                        <p>Пожалуйста, подтвердите свой email, нажав на кнопку ниже:</p>
                        <a class='btn' href='{confirmationLink}'>Подтвердить email</a>
                        <p>Если вы не регистрировались на нашем сайте, проигнорируйте это сообщение.</p>
                    </div>
                </body>
                </html>";

            await _bus.Publish(new EmailSendCommand()
            {
                Email = email,
                Subject = subject,
                Message = message
            });
            
            return;
        }

        ThrowExceptionAccordingError(result.Errors!, email, username);
    }
    public async Task TryConfirmEmailAsync(string userId, string token)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            throw new InvalidOperationException("Пользователь не найден");
        }

        var result = await _userManager.ConfirmEmailAsync(user, token);
        if (!result.Succeeded)
        {
            throw new InvalidOperationException("Ошибка подтверждения почты");
        }
    }

    public async Task SendPasswordResetCodeAsync(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
        {
            throw new InvalidOperationException("Пользователь не найден");
        }

        var code = await _userManager.GeneratePasswordResetTokenAsync(user);
        var encodedCode = HttpUtility.UrlEncode(code);
        var subject = "Сброс пароля";
        var message = $@"
            <html>
            <head>
                <meta charset=""UTF-8"">
                <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
                <title>{subject}</title>
                <style>
                    body {{
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        padding: 20px;
                    }}
                    .container {{
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 5px;
                        box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    }}
                    h2 {{
                        color: #333;
                    }}
                    p {{
                        color: #666;
                    }}
                    .code {{
                        background-color: #f0f0f0;
                        padding: 10px;
                        font-size: 18px;
                        border-radius: 5px;
                        margin-top: 10px;
                    }}
                </style>
            </head>
            <body>
                <div class='container'>
                    <h2>Здравствуйте, {user.UserName}!</h2>
                    <p>Вы запросили сброс пароля для вашей учетной записи.</p>
                    <p>Пожалуйста, используйте код ниже для сброса пароля:</p>
                    <p class='code'><strong>{encodedCode}</strong></p>
                    <p>Если вы не запрашивали сброс пароля, проигнорируйте это сообщение.</p>
                </div>
            </body>
            </html>";

        await _bus.Publish(new EmailSendCommand()
        {
            Email = email,
            Subject = subject,
            Message = message
        });
    }

    public async Task ResetPasswordAsync(string email, string code, string newPassword)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
        {
            throw new InvalidOperationException("Пользователь не найден");
        }

        var result = await _userManager.ResetPasswordAsync(user, code, newPassword);
        if (!result.Succeeded)
        {
            throw new InvalidOperationException("Ошибка сброса пароля");
        }
    }

    public async Task ChangePasswordAsync(string userId, string newPassword)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            throw new InvalidOperationException("Пользователь не найден");
        }

        var result = await _userManager.RemovePasswordAsync(user);
        if (!result.Succeeded)
        {
            throw new InvalidOperationException("Failed to remove old password");
        }

        result = await _userManager.AddPasswordAsync(user, newPassword);
        if (!result.Succeeded)
        {
            throw new InvalidOperationException("Failed to set new password");
        }
    }


    public async Task<Guid?> SignInAsync(string usernameOrEmail, string password, bool persist)
    {
        try
        {
            var mayBeUser = await _userManager.FindByEmailAsync(usernameOrEmail);
            if (mayBeUser == null)
            {
                mayBeUser = await _userManager.FindByNameAsync(usernameOrEmail);
                if (mayBeUser == null)
                {
                    return default;
                }
            }

            var passwordIsCorrect = await _userManager.CheckPasswordAsync(mayBeUser, password);
            if (!passwordIsCorrect)
            {
                return default;
            }

            await _signInManager.SignInAsync(mayBeUser, persist);

            return mayBeUser.Id;
        }
        catch
        {
            return default;
        }
    }

    public async Task<bool> SignOutAsync()
    {
        try
        {
            await _signInManager.SignOutAsync();
        }
        catch
        {
            return false;
        }

        return true;
    }

    private static void ThrowExceptionAccordingError(IEnumerable<IdentityError> errors, string email, string username)
    {
        if (errors.Any(x => x.Code == nameof(IdentityErrorDescriber.DuplicateUserName)))
        {
            throw new UsernameTakenException(username);
        }

        if (errors.Any(x => x.Code == nameof(IdentityErrorDescriber.DuplicateEmail)))
        {
            throw new EmailTakenException(email);
        }

        ThrowInvalidArgumentValueException(
            "username",
            errors.FirstOrDefault(x => x.Code == nameof(IdentityErrorDescriber.InvalidUserName)),
            username);

        ThrowInvalidArgumentValueException(
            "email",
            errors.FirstOrDefault(x => x.Code == nameof(IdentityErrorDescriber.InvalidEmail)),
            email);

        ThrowInvalidArgumentValueException<string>(
            "password",
            errors.FirstOrDefault(x => x.Code.StartsWith("Password")));
    }

    private static void ThrowInvalidArgumentValueException<T>(string argumentName, IdentityError? maybeError, T? value = default)
    {
        if (maybeError is null)
            return;

        throw new InvalidArgumentValueException(argumentName)
        {
            InvalidValue = value,
            ValidExample = maybeError.Description,
        };
    }
}
