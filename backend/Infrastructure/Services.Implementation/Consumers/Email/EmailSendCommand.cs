using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Implementation.Consumers.Email
{
    internal class EmailSendCommand
    {
        public string Email { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public bool IsMessageHtml { get; set; } = true;
    }
}
