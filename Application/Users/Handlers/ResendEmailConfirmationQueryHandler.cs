using Application.Services.Interfaces;
using Application.Users.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Application.Users.Handlers
{
    public class ResendEmailConfirmationQueryHandler : IRequestHandler<ResendEmailConfirmationQuery, string>
    {
        private readonly IUserService _userService;

        public ResendEmailConfirmationQueryHandler(IUserService userService)
        {
            _userService = userService;
        }
        public async Task<string> Handle(ResendEmailConfirmationQuery request, CancellationToken cancellationToken)
        {
            return await _userService.ResendEmailConfirmationLink(request.Email);
        }
    }
}