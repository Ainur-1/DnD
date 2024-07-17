using Contracts;
using GameHub.Dtos;

namespace GameHub;

public interface IHubEventActions
{
    public Task OnPartyJoin(CharacterDto characterDto);
    public Task OnPartyDisband();
    public Task OnCharacterUpdate(CharacterUpdatedEvent @event);
    public Task OnFightUpdate(FightStatusDto @event);
}
