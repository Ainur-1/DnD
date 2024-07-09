namespace Contracts;

public class DynamicStatsDto
{
    public int Hp { get; set; }
    public int TempHp { get; set; }
    public int ArmorClass { get; set; }
    public int Inspiration { get; set; }
    public int Speed { get; set; }
    public int HitDicesLeftCount { get; set; }
    public bool IsDead { get; set; }
    public bool IsDying { get; set; }
    public DeathSavesDto? DeathSaves { get; set; }
}
