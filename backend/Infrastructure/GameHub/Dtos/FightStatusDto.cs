namespace GameHub.Dtos;

public class FightStatusDto
{
    public bool IsFight { get; set; }
    public CharacterInitiativeScoreDto[]? ScoreValues { get; set; }

}
public class CharacterInitiativeScoreDto
{
    public Guid CharacterId { get; set; }
    public int Score { get; set; }
}