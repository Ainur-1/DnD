namespace Domain.Entities.Parties;

//todo: возможно избыточная таблица, но какбудто облегчающая поиск по комнатам. 
public class PartyMembership
{
    /// <summary>
    /// Character which is in party
    /// </summary>
    public Guid CharacterId { get; set; }

    /// <summary>
    /// User which is in Party as party member
    /// </summary>
    public virtual User User { get; set; }

    /// <summary>
    /// Party
    /// </summary>

    public virtual Party Party { get; set; }
}
