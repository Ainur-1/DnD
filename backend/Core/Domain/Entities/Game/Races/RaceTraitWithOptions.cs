using Domain.Entities.Races;

namespace Domain.Entities.Game.Races;

public class RaceTraitWithOptions : RaceTrait
{
    public string[]? Options { get; set; }
}
