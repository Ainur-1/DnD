using Domain.Utils;

namespace Domain.Entities.Characters;

public class CharacterManagement
{
    public Guid? JoinedPartyId { get; internal set; }

    public Guid OwnerId { get; protected set; }

    public int ActualLevel { get; protected set; }

    public bool IsDead { get; internal set; }

    public AccessType AccessType { get; protected set; }

    public CharacterManagement(
        AccessType accessType,
        Guid ownerId,
        int startXp
    ) 
    {
        if (ownerId == default) 
        {
            throw new ArgumentException("Provide character owner.", nameof(ownerId));
        }
        ArgumentOutOfRangeException.ThrowIfNegative(startXp, nameof(startXp));

        IsDead = false;
        AccessType = accessType;
        ActualLevel = LevelCalculator.XpToLevel(startXp);
        OwnerId = ownerId;
        // no joined parties on creation
        JoinedPartyId = default;
    }

    protected CharacterManagement() { }

    public bool CharacterCanUpdateLevel(int currentLevel) => currentLevel < ActualLevel;
}
