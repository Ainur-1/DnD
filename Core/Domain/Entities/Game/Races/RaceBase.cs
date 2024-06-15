using Domain.Entities.Character;
using Domain.Entities.Races;

namespace Domain.Entities.Game.Races.Base;

public abstract class RaceBase
{
    public string Name { get; set; }

    public AbilityBuff[] Abilities { get; set; }

    public RaceTraitWithOptions[] RaceTraits { get; set; }

    public CharacterSkillType[]? RaceSkillTraitsMastery { get; set; }
}
