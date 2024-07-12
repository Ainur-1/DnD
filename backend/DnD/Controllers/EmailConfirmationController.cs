using Microsoft.AspNetCore.Mvc;
using Services.Abstractions;

namespace DnD.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmailConfirmationController : Controller
    {
        private readonly IUserService _userService;

        public EmailConfirmationController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("confirm")]
        public async Task<IActionResult> ConfirmEmail(string userId, string token)
        {
            await _userService.ConfirmEmailAsync(userId, token);
            return Ok("Почта успешна");
        }
    }
}
