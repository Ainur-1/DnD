using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameHub;

public interface IHubEventActions
{
    public Task OnPartyJoin();
    public Task OnPartyDisband();
    public Task OnCharacterUpdate();
    public Task OnFightUpdate();

}
