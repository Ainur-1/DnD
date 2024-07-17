namespace Contracts.Online;

public record InGameStatsUpdateDto
{
    public int? Inspiration { get; set; }
    public int? Speed { get; set; }
}