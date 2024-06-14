using Domain.Entities.Character;

namespace Domain.Entities.Races;

public class Race
{
    public RaceType Id { get; set; }

    public string RaceName { get; set; }

    public string? SubraceName { get; set; }


    public int AdultAge { get; set; }

    public CharacterAlignmentType RecommendedAlignment { get; set; }

    public Size Size { get; set; }

    public int Speed { get; set; }

    public string[] Languages { get; set; }



    // todo: if postgresql then thats one to many ralation else thats simple array
    public virtual List<AbilityBuff> Abilities { get; set; }

    // todo: if postgresql then thats one to many ralation else thats simple array
    public virtual List<RaceTrait> RaceTraits { get; set; }
}
