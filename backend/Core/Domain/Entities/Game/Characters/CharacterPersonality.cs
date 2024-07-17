using Domain.Entities.Classes;
using Domain.Entities.Game.Races;
using Domain.Entities.Races;

namespace Domain.Entities.Characters;

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

    public List<ClassFeature> ClassFeatures { get; protected set; } =  new();

    public List<RaceTrait> RaceTraits { get; protected set; } = new();

    public string[] Languages { get; protected set; } = Array.Empty<string>();

    /// <summary>
    /// Custom user defined traits.
    /// </summary>
    public string[] OtherTraits { get; protected set; } = Array.Empty<string>();

    public int Level { get; protected set; }

    public Size Size { get; protected set; }
    // so bad
    public CharacterPersonality(
        string name,
        byte[]? image,
        int age, 
        RaceName raceName,
        List<RaceTrait> startRaceTraits,
        ClassType @class,
        List<ClassFeature> startClassFeatures,
        int startXp, 
        CharacterAlignmentType alignment,
        string background,
        string[] bonds,
        string[] flaws,
        string[] languages,
        string[] otherTraits,
        Size size
    ) 
    {
        // 1st level by default, 
        // since we must provide choosable updates
        // Level != ActualLevel
        Level = 1;

        ArgumentNullException.ThrowIfNull(name, nameof(name));
        ArgumentNullException.ThrowIfNull(startRaceTraits, nameof(startRaceTraits));
        ArgumentNullException.ThrowIfNull(startClassFeatures, nameof(startClassFeatures));
        ArgumentNullException.ThrowIfNull(bonds, nameof(bonds));
        ArgumentNullException.ThrowIfNull(flaws, nameof(flaws));
        ArgumentNullException.ThrowIfNull(languages, nameof(languages));
        ArgumentNullException.ThrowIfNull(otherTraits, nameof(otherTraits));
        ArgumentNullException.ThrowIfNull(background, nameof(background));

        ArgumentOutOfRangeException.ThrowIfNegative(startXp, nameof(startXp));
        ArgumentOutOfRangeException.ThrowIfLessThanOrEqual(age, 0, nameof(age));

        if (alignment == CharacterAlignmentType.Any) 
        {
            throw new ArgumentOutOfRangeException(
                nameof(alignment), 
                alignment, 
                $"Select character alignment. {CharacterAlignmentType.Any} is readonly."
            );
        }

        if (image != null && image.Length > 1024 * 1024 * 3)
        {
            throw new ArgumentException(nameof(image), "Image must be less than 3 mb");
        }

        Name = name;
        Image = image;
        Age = age;
        Race = raceName;
        Class = @class;
        Xp = startXp;
        Alignment = alignment;
        Bonds = bonds;
        Flaws = flaws;
        Background = background;
        ClassFeatures = startClassFeatures;
        RaceTraits = startRaceTraits;
        Languages = languages;
        OtherTraits = otherTraits;
        Size = size;
    }

    protected CharacterPersonality() {}
}
