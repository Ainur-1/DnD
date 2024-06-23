using Domain.Entities.Character;


namespace Domain.Entities;

public class AbilityBuff
{
    public CharacterAbilityType AbilityType { get; set; }

    public int BuffValue { get; set; }
}
