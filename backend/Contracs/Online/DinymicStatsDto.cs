using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracs.Online
{
    public class DinymicStatsDto
    {
        public int Hp { get; set; }
        public int TempHp { get; set; }
        public int ArmorClass { get; set; }
        public int Profiency { get; set; }
        public int Initiative { get; set; }
        public int Inspiration { get; set; }
        public int Speed { get; set; }
        public int HitDicesLeftCount { get; set; }
        public bool IsDead { get; set; }
        public bool IsDying { get; set; }
        public DeathSavesDto? DeathSaves { get; set; }

    }
}
