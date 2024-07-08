namespace Contracts.Online;

public class GameCharacterDto
{
    public Guid Id {  get; set; }  
    public CharacterPersonalityDto Personality { get; set; }
    public CharacterStatsDto CharacterStats { get; set; }
    public DynamicStatsDto DynamicStats { get; set; }
}
