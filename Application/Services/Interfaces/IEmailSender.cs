namespace Application.Services.Interfaces
{
    public interface IEmailSender
    {
        Task  SendEmailAsync(string userEmail, string emailSubject, string message);
    }
}