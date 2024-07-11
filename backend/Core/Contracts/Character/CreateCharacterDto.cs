using Contracts.Items;
using Domain.Entities.Character;
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

    public string? MaybeSubrace { get; init; }

    public Dictionary<string, int> RaceTraitsAdjustments { get; init; } = new();

    public string? MaybeBase64Image { get; init; }

    public int Age { get; init; }
    
    public int Speed { get; init; }

    public CharacterAlignmentType Alignment { get; init; } = CharacterAlignmentType.Unaligned;

    public string Background { get; init; } = "";

    public string[] Languages { get; init; } = Array.Empty<string>();
    
    public string[] Flaws { get; init; } = Array.Empty<string>();
    
    public string[] Bonds { get; init; } = Array.Empty<string>();
    
    public string[] OtherTraits { get; init; } = Array.Empty<string>();

    public CreateInventoryItemDto[] StartInventory { get; init; } = Array.Empty<CreateInventoryItemDto>();

    public CharacterCurrency StartWealth { get; init; } = new();
}
