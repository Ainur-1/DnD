namespace Domain.Entities.Parties;

public class Party
{
    public Guid Id { get; protected set; }

    public User GameMaster { get; protected set; }

    // public List<User> Participants { get; set; }
    // public List<Id> Participants { get; set; }

    public void Add()
    {
        throw new NotImplementedException("Add method is not implemented");
    }
}
