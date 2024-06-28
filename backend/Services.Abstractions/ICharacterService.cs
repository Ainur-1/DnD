using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Contracs.Online;

namespace Services.Abstractions;

public interface ICharacterService
{
    public Task<GameCharacterDto> GetByIdAsync(Guid id);
    public Task<DinymicStatsDto> GetCharacterInGameStatsAsync(Guid characterId);
    public Task UpdateCharacterInGameStatsAsync(Guid characterId, DinymicStatsDto updatestats);
}

