﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameHub.Dtos
{
    public class FightUpdatedEvent
    {
        public FightStatusDto Status { get; set; }

        //public bool IsFight {  get; set; }
        //public ? ScoreValues { get; set; }
    }
}
