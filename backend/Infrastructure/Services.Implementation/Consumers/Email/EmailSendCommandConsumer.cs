using MassTransit;
using Services.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Implementation.Consumers.Email
{
    internal class EmailSendCommandConsumer(IEmailService _emailService) : IConsumer<EmailSendCommand>
    {

        public Task Consume(ConsumeContext<EmailSendCommand> context)
        {
            var message = context.Message;
            return _emailService.SendEmailAsync(message.Email, message.Subject, message.Message, message.IsMessageHtml);
        }
    }
}
