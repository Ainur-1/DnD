using GameHub.blazor;
using Microsoft.AspNetCore.Components.Server.Circuits;

namespace DnD;

public class InitializeCircuitHandler(
    HubConnectionService hubConnectionService)
    : CircuitHandler
{
    public override async Task OnCircuitOpenedAsync(Circuit circuit, CancellationToken cancellationToken)
    {
        try
        {
            await hubConnectionService.InitHubConnection(cancellationToken);
        }
        catch (Exception ex)
        {
            // log
        }
    }
}
