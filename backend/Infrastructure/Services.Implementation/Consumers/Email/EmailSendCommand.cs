namespace Services.Implementation.Consumers.Email;

public record EmailSendCommand
{
    public string Email { get; set; }
    public string Subject { get; set; }
    public string Message { get; set; }
    public bool IsMessageHtml { get; set; } = true;
}
