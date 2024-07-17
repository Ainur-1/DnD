using Domain.Entities.Races;
using Newtonsoft.Json;

namespace Domain.Entities.Game.Races;

public class RaceName
{
    public RaceType Race { get; protected set; }

    public string? SubRaceName { get; protected set; }

    public RaceName(RaceType race, string? subRaceName = default)
    {
        Race = race;

        if (Race is RaceType.Dwarf or RaceType.Elf && string.IsNullOrEmpty(subRaceName))
        {
            throw new ArgumentException("Sub race is required for this race.", nameof(subRaceName));
        } 

        SubRaceName = subRaceName;
    }

    protected RaceName() { }

    public override string ToString() => string.IsNullOrEmpty(SubRaceName) ? JsonConvert.SerializeObject(Race) : $"{SubRaceName} {JsonConvert.SerializeObject(Race)}";
}
