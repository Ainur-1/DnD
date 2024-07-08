using DnD.Extensions;
using Domain.Exceptions;

namespace DnD.GraphQL.Extensions;

public static class IHttpContextAccessorExtensions
{
    public static Guid GetUserIdOrThrowAccessDenied(this IHttpContextAccessor httpContextAccessor)
        => ThrowAccessDeniedIfNull(httpContextAccessor.HttpContext?.User.GetUserId());

    private static Guid ThrowAccessDeniedIfNull(Guid? guid)
    {
        return guid.HasValue ? guid.Value : throw new AccessDeniedException();
    }

}
