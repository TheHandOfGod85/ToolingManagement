using Application.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Infrastructure.Email
{
    public class EmailSender : IEmailSender
    {
        private readonly IConfiguration _config;

        public EmailSender(IConfiguration config)
        {
            _config = config;
        }
        public async Task SendEmailAsync(string userEmail, string emailSubject, string message)
        {
            var client = new SendGridClient(_config["SendGrid:Key"]);
            var emailMessage = new SendGridMessage
            {
                From = new EmailAddress("sideprojects85@hotmail.com", _config["Sendgrid:User"]),
                Subject = emailSubject,
                PlainTextContent = message,
                HtmlContent = message
            };
            emailMessage.AddTo(new EmailAddress(userEmail));
            emailMessage.SetClickTracking(false, false);

            await client.SendEmailAsync(emailMessage);
        }
    }
}