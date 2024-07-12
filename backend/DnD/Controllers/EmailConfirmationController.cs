using Microsoft.AspNetCore.Mvc;
using Services.Abstractions;

namespace DnD.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmailConfirmationController : Controller
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;
        public EmailConfirmationController(IUserService userService, IConfiguration configuration)
        {
            _userService = userService;
            _configuration = configuration;
        }
        
        [HttpGet("confirm")]
        public async Task<IActionResult> ConfirmEmail(string userId, string token)
        {
            try
            {
                await _userService.TryConfirmEmailAsync(userId, token);
                string frontendHost = _configuration["FrontendHost"];
                return Redirect(frontendHost);
            }
            catch (Exception)
            {
                return NotFound();
            }

        }

    }
}
