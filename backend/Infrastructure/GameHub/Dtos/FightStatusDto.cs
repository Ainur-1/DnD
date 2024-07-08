namespace GameHub.Dtos;

public class FightStatusDto
{
    public bool IsFight { get; set; }
    public CharacterInitciativeScoreDto[]? ScoreValues { get; set; }

}
public class CharacterInitciativeScoreDto
{
    public Guid CharacterId { get; set; }
    public int Score { get; set; }
}