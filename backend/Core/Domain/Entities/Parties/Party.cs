namespace Domain.Entities.Parties;

public class Party
{
    public Guid Id { get; protected set; }
    public Guid GameMasterId { get; protected set; }
    public List<Guid> InGameCharactersIds { get; set; }

    public string AccessCode { get; protected set; }
    public void Add()
    {
        throw new NotImplementedException("Add method is not implemented");
    }
}
