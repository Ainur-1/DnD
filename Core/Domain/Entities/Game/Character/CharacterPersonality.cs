using Domain.Entities.Classes;
using Domain.Entities.Game.Races;
using Domain.Entities.Races;

namespace Domain.Entities.Character;

public class CharacterPersonality
{
    public string Name { get; protected set; } = string.Empty;

    public byte[]? Image { get; protected set; } 

    public int Age { get; protected set; }

    public RaceName Race { get; protected set; }

    public ClassType Class { get; protected set; }

    public int Xp { get; protected set; }

    public CharacterAlignmentType Alignment { get; protected set; }

    public string[] Bonds { get; protected set; } = Array.Empty<string>();

    public string[] Flaws { get; protected set; } = Array.Empty<string>();

    public string Background { get; protected set; } = string.Empty;

    public ClassFeature[] ClassFeatures { get; protected set; } = Array.Empty<ClassFeature>();

    public RaceTrait[] RaceTraits { get; protected set; } = Array.Empty<RaceTrait>();

    public string[] Languages { get; protected set; } = Array.Empty<string>();

    /// <summary>
    /// Custom user defined traits.
    /// </summary>
    public string[] OtherTraits { get; protected set; } = Array.Empty<string>();

    public int Level { get; protected set; }
}
