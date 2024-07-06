using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using MongoDbGenericRepository;
using Domain.Entities.User;
using HotChocolate;

namespace DnD.GraphQL
{
    public class Mutation
    {
        public async Task<SignUpPayload> SignUpAsync(
            string email,
            string username,
            string password,
            string? name,
            [Service] UserManager<User> userManager,
            [Service] IMongoDbContext context)
        {
            var user = new User
            {
                UserName = username,
                Email = email,
                Name = name
            };
            var result = await userManager.CreateAsync(user, password);

            return new SignUpPayload(result);
        }

        public async Task<SignInPayload> SignInAsync(
            string login,
            string password,
            [Service] SignInManager<User> signInManager,
            [Service] UserManager<User> userManager,
            ClaimsPrincipal claimsPrincipal)
        {
            // Поиск пользователя по логину (email или username)
            var user = await userManager.FindByNameAsync(login) ?? await userManager.FindByEmailAsync(login);
            if (user == null)
            {
                return new SignInPayload(new List<string> { "Invalid login attempt." });
            }

            // Авторизация пользователя
            var result = await signInManager.CheckPasswordSignInAsync(user, password, false);
            if (!result.Succeeded)
            {
                return new SignInPayload(new List<string> { "Invalid login attempt." });
            }

            // Генерация JWT-токена
            var token = await GenerateJwtTokenAsync(user, claimsPrincipal);

            return new SignInPayload(token);
        }

        public async Task<bool> SignOutAsync([Service] SignInManager<User> signInManager)
        {
            await signInManager.SignOutAsync();
            return true;
        }

        //public async Task<UpdateInventoryItemPayload> UpdateInventoryItemAsync(
        //    string characterId,
        //    bool delete,
        //    InventoryItemInput input,
        //    [Service] IMongoDbContext context)
        //{
        //    // Поиск персонажа
        //    var character = await context.GetCharacter(characterId);
        //    if (character == null)
        //    {
        //        return new UpdateInventoryItemPayload(new List<string> { "Character not found." });
        //    }

        //    // Обновление инвентаря
        //    var item = character.Inventory.FirstOrDefault(i => i.Id == input.Id);
        //    if (item == null)
        //    {
        //        return new UpdateInventoryItemPayload(new List<string> { "Item not found." });
        //    }

        //    if (delete)
        //    {
        //        character.Inventory.Remove(item);
        //    }
        //    else
        //    {
        //        item.Count = input.Count;
        //        item.InUse = input.InUse;
        //        item.ProficiencyOn = input.ProficiencyOn;
        //    }

        //    await context.SaveChangesAsync();

        //    return new UpdateInventoryItemPayload(character.Inventory);
        //}

        private async Task<string> GenerateJwtTokenAsync(User user, ClaimsPrincipal claimsPrincipal)
        {
            // Генерация JWT-токена
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim("Name", user.Name)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("your_secret_key"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(30);

            var token = new JwtSecurityToken(
                issuer: "your_issuer",
                audience: "your_audience",
                claims: claims,
                expires: expires,
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
