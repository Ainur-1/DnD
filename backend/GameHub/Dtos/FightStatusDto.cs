using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameHub.Dtos;

public class FightStatusDto
{
    public bool IsFight { get; set; }
    public CharacterInitciativeScoreDto[]? ScoreValues { get; set; }

}
public class CharacterInitciativeScoreDto
{
    public string CharacterId { get; set; }
    public int Score { get; set; }
}