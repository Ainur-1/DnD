using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Contracs.Online;
namespace GameHub.Models
{
    public class GameRoomResponse
    {
        public bool IsFighting { get; set; }
        public string[]? Order { get; set; }
        public GameCharacterDto? Character { get; set; }
    }
}
