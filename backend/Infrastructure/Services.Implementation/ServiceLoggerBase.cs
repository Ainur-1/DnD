using Domain.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Services.Abstractions;
using System.Security.Claims;
using Serilog;
using Serilog.Events;

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
                _logger.LogInformation("User {userId} called {operation} {timestamp}.",
                    _callerUserId, operationName, DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss"));

                await task;

                _logger.LogInformation("User {userId} completed {operation} {timestamp}.",
                    _callerUserId, operationName, DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss"));
            }
            catch (DomainException)
            {
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "User {userId} raised exceptions: {ex} at {operation} {timestamp}.",
                    _callerUserId, ex.GetType().Name, operationName, DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss"));

                throw;
            }
        }
    }
}
