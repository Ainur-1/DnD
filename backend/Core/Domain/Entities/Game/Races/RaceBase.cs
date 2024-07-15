using Domain.Entities.Characters;

namespace Domain.Entities.Game.Races.Base;

public abstract class RaceBase
{
    public string Name { get; set; }

    public AbilityBuff[] Abilities { get; set; }

    public RaceTraitDescriptor[] RaceTraits { get; set; }
}
