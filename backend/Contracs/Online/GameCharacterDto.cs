using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracs.Online
{
    public class GameCharacterDto
    {
        public Guid Id {  get; set; }  
        public CharacterPersonalityDto Personality { get; set; }
        public CharacterStatsDto CharacterStats { get; set; }


    }

}
