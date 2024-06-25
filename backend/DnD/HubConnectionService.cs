using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace GameHub.blazor;

public class HubConnectionService(
    NavigationManager navigationManager,
    IHttpContextAccessor httpContextAccessor)
{
    public HubConnection HubConnection { get; private set; }

    public async Task InitHubConnection(CancellationToken cancellationToken = default)
    {
        var cookies = new Dictionary<string, string>();
        httpContextAccessor.HttpContext.Request.Cookies.ToList().ForEach(x => cookies.Add(x.Key, x.Value));

        this.HubConnection = new HubConnectionBuilder()
                             .WithUrl(navigationManager.ToAbsoluteUri("/gamehub"), options =>
                             {
                                 options.UseDefaultCredentials = true;
                                 var cookieContainer = cookies.Any()
                                    ? new CookieContainer(cookies.Count)
                                    : new CookieContainer();
                                 foreach (var cookie in cookies)
                                     cookieContainer.Add(new Cookie(
                                         cookie.Key,
                                         WebUtility.UrlEncode(cookie.Value),
                                         path: "/",
                                         domain: navigationManager.ToAbsoluteUri("/").Host));
                                 options.Cookies = cookieContainer;

                                 foreach (var header in cookies)
                                     options.Headers.Add(header.Key, header.Value);

                                 options.HttpMessageHandlerFactory = (input) =>
                                 {
                                     var clientHandler = new HttpClientHandler
                                     {
                                         PreAuthenticate = true,
                                         CookieContainer = cookieContainer,
                                         UseCookies = true,
                                         UseDefaultCredentials = true,
                                     };
                                     return clientHandler;
                                 };
                             })
                             .WithAutomaticReconnect()
                             .Build();

        await this.HubConnection.StartAsync(cancellationToken);
    }

    public async ValueTask DisposeAsync()
    {
        if (this.HubConnection != null)
        {
            await this.HubConnection.DisposeAsync();
        }
    }
}
