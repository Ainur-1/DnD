using Contracts.Online;
using GameHub.Models;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameHub.Dtos
{
    public class GameRoomDto
    {
        public bool IsFight { get; set; }

        public IEnumerable<Guid>? Order { get; set; }
        public IEnumerable<GameCharacterDto> Characters { get; set; }


    }
}
