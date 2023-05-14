using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Application.Users.Queries
{
    public class ResendEmailConfirmationQuery : IRequest<string>
    {
        public ResendEmailConfirmationQuery(string email)
        {
            Email = email;
        }
        public string Email { get; set; }
    }
}