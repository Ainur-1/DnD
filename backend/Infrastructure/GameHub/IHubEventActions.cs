using Contracts;
using GameHub.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameHub;

public interface IHubEventActions
{
    public Task OnPartyJoin(Guid partyId, CharacterDto characterDto);
    public Task OnPartyDisband(Guid partyId, string message);
    public Task OnCharacterUpdate(CharacterUpdatedEvent @event);
    public Task OnFightUpdate(FightUpdatedEvent @event);
}
