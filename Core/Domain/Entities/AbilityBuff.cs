using Domain.Entities.Character;


namespace Domain.Entities;

public class AbilityBuff
{

    public int Id { get; set; } 

    public CharacterAbilityType AbilityType { get; set; }

    public int BuffValue { get; set; }
}
