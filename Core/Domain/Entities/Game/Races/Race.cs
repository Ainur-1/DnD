using Domain.Entities.Game.Races;
using Domain.Entities.Game.Races.Base;

namespace Domain.Entities.Races;

public class Race : RaceBase
{
    public RaceType Id { get; set; }

    public int AdultAge { get; set; }

    public string RecommendedAlignmentDescription { get; set; }

    public Size Size { get; set; }

    public int Speed { get; set; }

    public string[] Languages { get; set; }

    /// <summary>
    /// Sub races adjustments
    /// </summary>
    public SubRaceInfo[]? SubRacesAdjustments { get; set; }
}
