using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using DnD.Areas.Identity.Data;
using DataAccess;
using Microsoft.AspNetCore.Identity.UI.Services;
using DnD.Areas.Identity.Pages.Account;
using AspNetCore.Identity.MongoDbCore.Models;

namespace DnD
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var mongoDbSettings = builder.Configuration.GetSection(nameof(MongoDbConfig)).Get<MongoDbConfig>();
            builder.Services
                .AddIdentity<User, UserRole>(options =>
                {
                    options.SignIn.RequireConfirmedEmail = false; //Отключена подтверждения почты и аккаунта (Временно)
                    options.SignIn.RequireConfirmedAccount = false;
                })
                .AddMongoDbStores<User, UserRole, Guid>(mongoDbSettings.ConnectionString, mongoDbSettings.Name)
                .AddDefaultTokenProviders()
                .AddDefaultUI();


            // Add services to the container.
            builder.Services.AddRazorPages();
            builder.Services.AddTransient<IEmailSender, EmailSender>();


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapRazorPages();

            app.Run();
        }
    }
}
