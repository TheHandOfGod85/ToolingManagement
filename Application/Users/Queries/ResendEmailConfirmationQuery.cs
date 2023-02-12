using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Application.Users.Queries
{
    public class ResendEmailConfirmationQuery : IRequest<ActionResult>
    {
        public ResendEmailConfirmationQuery(string email)
        {
            Email = email;
        }
        public string Email { get; set; }
    }
}