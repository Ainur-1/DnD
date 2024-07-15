using AutoMapper;
using Contracts;
using Domain.Entities.Characters;

namespace Mappings.Resolvers;

internal class DeathSavesResolver : IValueResolver<Character, DynamicStatsDto, DeathSavesDto>
{
    public DeathSavesDto Resolve(Character source, DynamicStatsDto destination, DeathSavesDto destMember, ResolutionContext context)
    {
        var inGameStats = source.InGameStats ?? throw new ArgumentNullException(nameof(source.InGameStats), "Can not resolve death saves since character does not have InGameStats.");
        return new DeathSavesDto
        {
            FailureCount = inGameStats.DeathSavesFailureCount,
            SuccessCount = inGameStats.DeathSavesSuccessCount
        };
    }
}
