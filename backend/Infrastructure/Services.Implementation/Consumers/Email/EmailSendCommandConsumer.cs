using MassTransit;
using Services.Abstractions;

namespace Services.Implementation.Consumers.Email
{
    internal class EmailSendCommandConsumer : IConsumer<EmailSendCommand>
    {
        private readonly IEmailService _emailService;

        public EmailSendCommandConsumer(IEmailService emailService) => _emailService = emailService;


        public Task Consume(ConsumeContext<EmailSendCommand> context)
        {
            var message = context.Message;
            return _emailService.SendEmailAsync(message.Email, message.Subject, message.Message, message.IsMessageHtml);
        }
    }
}
