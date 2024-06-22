namespace Domain.Entities.Character;

public class CharacterManagement
{
    public Guid JoinedPartyId { get; set; }

    public Guid OwnerId { get; set; }

    public int ActualLevel { get; set; }

    public bool IsDead { get; set; }

    public bool CharacterCanUpdateLevel(int currentLevel) => currentLevel < ActualLevel;
}
