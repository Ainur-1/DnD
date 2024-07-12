using Contracts;

namespace GameHub.Dtos
{
    public class CharacterUpdatedEvent
    {
        public Guid Id { get; set; }
        public DynamicStatsDto Stats { get; set; }
    }
}
