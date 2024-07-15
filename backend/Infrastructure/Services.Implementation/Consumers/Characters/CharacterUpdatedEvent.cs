namespace Services.Implementation.Consumers.Characters;

public record CharacterUpdatedEvent 
{
    public Guid Id { get; set; }
}