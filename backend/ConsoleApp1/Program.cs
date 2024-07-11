using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Services.Abstractions;
using Services.Implementation;

namespace ConsoleApp
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .Build();

            // Пример использования конфигурации
            string smtpServer = configuration["Smtp:Server"];
            int smtpPort = int.Parse(configuration["Smtp:Port"]);
            string smtpUser = configuration["Smtp:User"];
            string smtpPass = configuration["Smtp:Pass"];

            Console.WriteLine($"SMTP Server: {smtpServer}");
            Console.WriteLine($"SMTP Port: {smtpPort}");
            Console.WriteLine($"SMTP User: {smtpUser}");
            Console.WriteLine($"SMTP Pass: {smtpPass}");

            Console.WriteLine("Press any key to continue.");
            Console.ReadKey();

            // Настройка DI контейнера
            var serviceProvider = ConfigureServices(configuration);

            // Тестирование отправки электронной почты
            await TestEmailService(serviceProvider.GetService<IEmailService>());

            Console.WriteLine("Тестирование завершено. Нажмите любую клавишу для выхода.");
            Console.ReadKey();
        }

        static IServiceProvider ConfigureServices(IConfiguration configuration)
        {
            // Создание сервис провайдера
            var services = new ServiceCollection();

            // Добавление необходимых сервисов
            services.AddTransient<IEmailService>(provider =>
                new EmailService(
                    configuration["Smtp:Server"],
                    int.Parse(configuration["Smtp:Port"]),
                    configuration["Smtp:User"],
                    configuration["Smtp:Pass"]
                ));
            services.AddTransient<IUserService, UserManagementService>();
            // Добавьте любые другие сервисы, необходимые для тестирования

            return services.BuildServiceProvider();
        }

        static async Task TestEmailService(IEmailService emailService)
        {
            try
            {
                // Параметры тестового письма
                string toEmail = "mudarisov345@gmail.com";
                string subject = "Тестовое письмо";
                string body = "Это тестовое сообщение.";

                // Отправка тестового письма
                await emailService.SendEmailAsync(toEmail, subject, body);

                Console.WriteLine("Тестовое письмо успешно отправлено.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Ошибка при отправке тестового письма: {ex.Message}");
            }
        }
    }
}
