using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Application.Users.Commands
{
    public class VerifyEmailCommand : IRequest<string>
    {
        public VerifyEmailCommand(string token, string email)
        {
            Token = token;
            Email = email;
        }
        public string Token { get; set; }
        public string Email { get; set; }
    }
}