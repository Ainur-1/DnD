using Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameHub.Dtos
{
    public class CharacterUpdatedEvent
    {
        public Guid Id { get; set; }
        public DynamicStatsDto Stats { get; set; }

    }
}
