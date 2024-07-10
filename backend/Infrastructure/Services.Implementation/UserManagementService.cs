﻿using Domain.Entities.User;
using Domain.Exceptions;
using Microsoft.AspNetCore.Identity;
using Services.Abstractions;
using System.Text.RegularExpressions;

namespace Services.Implementation;

internal class UserManagementService : IUserService, IAuthorizationService
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;

    public UserManagementService(UserManager<User> userManager, SignInManager<User> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    public async Task CreateAsync(string email, string username, string password, string? name = null)
    {

        //todo: validate arguments
        ValidateEmail(email);
        ValidateUsername(username);
        ValidatePassword(password);

        var user = new User
        {
            UserName = username,
            Email = email,
            Name = name
        };

        var result = await _userManager.CreateAsync(user, password);

        if (result.Succeeded)
        {
            return;
        }

        ThrowExceptionAccordingError(result.Errors!, email, username);
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

    private void ValidateEmail(string email)
    {
        if (string.IsNullOrWhiteSpace(email) || !Regex.IsMatch(email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
        {
            throw new InvalidArgumentValueException("email")
            {
                InvalidValue = email,
                ValidExample = "example@domain.com",
            };
        }
    }

    private void ValidateUsername(string username)
    {
        if (string.IsNullOrWhiteSpace(username) || username.Length < 3 || username.Length > 20)
        {
            throw new InvalidArgumentValueException("username")
            {
                InvalidValue = username,
                ValidExample = "username must be between 3 and 20 characters",
            };
        }
    }

    private void ValidatePassword(string password)
    {
        if (string.IsNullOrWhiteSpace(password) || password.Length < 6)
        {
            throw new InvalidArgumentValueException("password")
            {
                InvalidValue = password,
                ValidExample = "password must be at least 6 characters",
            };
        }
        if (!Regex.IsMatch(password, @"[A-Z]"))
        {
            throw new InvalidArgumentValueException("password")
            {
                InvalidValue = password,
                ValidExample = "password must contain at least one uppercase letter",
            };
        }

        if (!Regex.IsMatch(password, @"[a-z]"))
        {
            throw new InvalidArgumentValueException("password")
            {
                InvalidValue = password,
                ValidExample = "password must contain at least one lowercase letter",
            };
        }

        if (!Regex.IsMatch(password, @"[0-9]"))
        {
            throw new InvalidArgumentValueException("password")
            {
                InvalidValue = password,
                ValidExample = "password must contain at least one digit",
            };
        }

        if (!Regex.IsMatch(password, @"[\W_]"))
        {
            throw new InvalidArgumentValueException("password")
            {
                InvalidValue = password,
                ValidExample = "password must contain at least one special character",
            };
        }
    }
}
