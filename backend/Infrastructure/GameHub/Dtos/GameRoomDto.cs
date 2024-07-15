using Contracts.Online;

namespace GameHub.Dtos;

public record GameRoomDto
{
    public bool IsFight { get; init; }
    public IEnumerable<Guid>? Order { get; init; }
    public IEnumerable<GameCharacterDto> Characters { get; init; } = Array.Empty<GameCharacterDto>();
}
