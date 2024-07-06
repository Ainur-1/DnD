using Contracs.Online;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameHub.Service
{
    public class CharacterService : ICharacterService
    {
        public async Task<GameCharacterDto> GetByIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<DinymicStatsDto> GetCharacterInGameStatsAsync(Guid characterId)
        {
            throw new NotImplementedException();
        }

        public async Task UpdateCharacterInGameStatsAsync(Guid characterId, DinymicStatsDto updatestats)
        {
            throw new NotImplementedException();
        }
    }
}
