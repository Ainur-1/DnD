namespace Services.Implementation.Consumers.Character;

public record CharacterUpdatedEvent 
{
    public Guid Id { get; set; }
}