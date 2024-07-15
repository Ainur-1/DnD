using Domain.Entities.Characters;


namespace Domain.Entities;

public class AbilityBuff
{
    public CharacterAbilityType AbilityType { get; set; }

    public int BuffValue { get; set; }
}
