using Domain.Entities.Classes;
using Domain.Entities.Races;

namespace Contracts.Character;

public record CreateCharacterDto
{
    public string Name { get; init; } = "";

    public bool CoinsAffectOnWeight { get; init; }

    public bool IsPublic { get; init; }

    public int Strength { get; init; }
    public int Dexterity { get; init; }
    public int Constitution { get; init; }
    public int Intelligence { get; init; }
    public int Wisdom { get; init; }
    public int Charisma { get; init; }

    public int Xp { get; init; }

    public ClassType Class { get; init; }

    public RaceType Race { get; init; }

    public int SubRaceIndex { get; init; }
}
