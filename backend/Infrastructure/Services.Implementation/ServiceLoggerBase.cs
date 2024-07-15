using Domain.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Services.Abstractions;
using System.Security.Claims;

namespace Services.Implementation
{
    public abstract class ServiceLoggerBase<TService> where TService : IDomainService
    {
        protected readonly ILogger<TService> _logger;
        private readonly string? _callerUserId;

        protected ServiceLoggerBase(ILogger<TService> logger, IHttpContextAccessor httpContext)
        {
            _logger = logger;
            _callerUserId = httpContext.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }

        protected async Task AwaitWithLogAsync(Task task, string operationName)
        {
            try
            {
                _logger.LogInformation("User {userId} called {operation} [yyyy-MM-dd HH:mm:ss].",
                    _callerUserId, operationName, DateTime.UtcNow);

                await task;

                _logger.LogInformation("User {userId} completed {operation} [yyyy-MM-dd HH:mm:ss].",
                    _callerUserId, operationName, DateTime.UtcNow);
            }
            catch (DomainException)
            {
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "User {userId} raised exceptions: {ex} at {operation} [yyyy-MM-dd HH:mm:ss].",
                    _callerUserId, ex.GetType().Name, operationName, DateTime.UtcNow);

                throw;
            }
        }
    }
}
