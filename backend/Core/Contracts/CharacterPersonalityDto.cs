using Domain.Entities.Characters;
using Domain.Entities.Classes;
using Domain.Entities.Races;

namespace Contracts;

public class CharacterPersonalityDto
{
    public string Name { get; init; } = string.Empty;

    public string? Base64Image { get; init; }

    public int Age { get; init; }

    public string Race { get; init; }

    public string Class { get; init; }

    public CharacterAlignmentType Alignment { get; init; }

    public string[] Bonds { get; init; } = Array.Empty<string>();

    public string[] Flaws { get; init; } = Array.Empty<string>();

    public string Background { get; init; } = string.Empty;

    public ClassFeatureDto[] ClassFeatures { get; init; }

    public RaceTrait[] RaceTraits { get; init; } = Array.Empty<RaceTrait>();

    public string[] Languages { get; init; } = Array.Empty<string>();

    /// <summary>
    /// Custom user defined traits.
    /// </summary>
    public string[] OtherTraits { get; init; } = Array.Empty<string>();

    public int Level { get; init; }

    public bool CanLevelUp { get; init; }
}
