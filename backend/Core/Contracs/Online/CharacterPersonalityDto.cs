using Domain.Entities.Character;
using Domain.Entities.Classes;
using Domain.Entities.Races;

namespace Contracts.Online;

public class CharacterPersonalityDto
{
    public string Name { get; protected set; } = string.Empty;

    public byte[]? Image { get; protected set; }

    public int Age { get; protected set; }

    public string Race { get; protected set; }

    public ClassType Class { get; protected set; }

    public CharacterAlignmentType Alignment { get; protected set; }

    public string[] Bonds { get; protected set; } = Array.Empty<string>();

    public string[] Flaws { get; protected set; } = Array.Empty<string>();

    public string Background { get; protected set; } = string.Empty;

    public ClassFeatureDto[] ClassFeatures { get; protected set; }

    public RaceTrait[] RaceTraits { get; protected set; } = Array.Empty<RaceTrait>();

    public string[] Languages { get; protected set; } = Array.Empty<string>();

    /// <summary>
    /// Custom user defined traits.
    /// </summary>
    public string[] OtherTraits { get; protected set; } = Array.Empty<string>();

    public int Level { get; protected set; }
}
