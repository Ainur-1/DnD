namespace Domain.Entities.Races;

public class RaceTrait : IValueObject
{
    public string Name { get; protected set; } 

    public string Description { get; protected set; }

    public RaceTrait(string name, string description)
    {
        Name = name;
        Description = description;
    }
}
