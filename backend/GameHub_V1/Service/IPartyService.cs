using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameHub.Service
{
    public interface IPartyService
    {
        public Task<bool> IsGameMaster(Guid userId, Guid? partyId);
        public Task EndGameAsync(Guid partyId, int xp);

    }
}
