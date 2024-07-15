using Contracts.Inventory;
using Domain.Entities.Characters;
using Domain.Entities.Classes;
using Domain.Entities.Races;

namespace Contracts.Character;

public record CreateCharacterDto
{
    public string? MaybeName { get; init; }
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

    public string? MaybeSubrace { get; init; }

    public Dictionary<string, int> RaceTraitsAdjustments { get; init; } = new();

    public string? MaybeBase64Image { get; init; }

    public int Age { get; init; }
    
    public int Speed { get; init; }

    public CharacterAlignmentType Alignment { get; init; } = CharacterAlignmentType.Unaligned;

    public string? MaybeBackground { get; init; }

    public string[]? MaybeLanguages { get; init; }
    
    public string[]? MaybeFlaws { get; init; }
    
    public string[]? MaybeBonds { get; init; }
    
    public string[]? MaybeOtherTraits { get; init; }

    public CreateInventoryItemDto[]? MaybeStartInventory { get; init; }

    public StartWealthDto StartWealth { get; init; } = new();

    public CharacterSkillType[] SkillTraits { get; init; } = Array.Empty<CharacterSkillType>();
}
