using Domain.Entities.Classes;
using Domain.Entities.Races;

namespace Domain.Entities.Character;

public class CharacterPersonality
{
    public string Name { get; protected set; } = string.Empty;

    public string? ImageUrl { get; protected set; } 

    public int Age { get; protected set; }

    public RaceType Race { get; protected set; }

    public ClassType Class { get; protected set; }

    public int Xp { get; protected set; }

    public CharacterAlignmentType Alignment { get; protected set; }

    // better to have IReadonlyList
    public string[] Bonds { get; protected set; } = Array.Empty<string>();

    public string[] Flaws { get; protected set; } = Array.Empty<string>();

    public string Background { get; protected set; } = string.Empty;

    // ? maybe custom type or mapping to many to many
    public string[] ClassFeatures { get; protected set; } = Array.Empty<string>();

    public RaceTrait[] RaceTraits { get; protected set; } = Array.Empty<RaceTrait>();

    public string[] Languages { get; protected set; } = Array.Empty<string>();

    public string[] OtherTraits { get; protected set; } = Array.Empty<string>();

    public int Level { get; protected set; }
}
