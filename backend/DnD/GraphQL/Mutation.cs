using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using MongoDbGenericRepository;
using Domain.Entities.User;

namespace DnD.GraphQL;

public class Mutation
{
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
