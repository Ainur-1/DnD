using Domain.Entities.Game.Races;
using Domain.Entities.Game.Races.Base;

namespace Domain.Entities.Races;

public class Race : RaceBase, IEntity<RaceType>
{
    public RaceType Id { get; init; }

    public int AdultAge { get; init; }

    public string RecommendedAlignmentDescription { get; init; }

    public Size Size { get; init; }

    public int Speed { get; init; }

    public string[] Languages { get; init; }

    /// <summary>
    /// Sub races adjustments
    /// </summary>
    public SubRaceInfo[] SubRacesAdjustments { get; init; } = Array.Empty<SubRaceInfo>();

    public bool HasSubraces => SubRacesAdjustments != null;

    protected Race() { }

    public SubRaceInfo? GetSubRaceInfo(string subRaceName) =>
                SubRacesAdjustments!.FirstOrDefault(x => x.Name.ToUpper() == subRaceName?.ToUpper());
}
