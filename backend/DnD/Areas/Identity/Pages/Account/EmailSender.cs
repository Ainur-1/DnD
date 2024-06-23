using Microsoft.AspNetCore.Identity.UI.Services;

namespace DnD.Areas.Identity.Pages.Account
{
    public class EmailSender : IEmailSender
    {

        public Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            // Реализация отправки электронной почты
            // Например, использование SMTP-клиента или другого сервиса отправки почты
            return Task.CompletedTask;
            
        }
    }
}
