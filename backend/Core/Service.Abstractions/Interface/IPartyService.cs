using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Abstractions.Interface
{
    public interface IPartyService
    {
        public Task<bool> IsGameMaster(Guid userId, Guid partyId);
        public Task EndGameAsync(Guid partyId, int xp);

    }
}
