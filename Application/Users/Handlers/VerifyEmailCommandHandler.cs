using Application.Services.Interfaces;
using Application.Users.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Application.Users.Handlers
{
    public class VerifyEmailCommandHandler : IRequestHandler<VerifyEmailCommand, string>
    {
        private readonly IUserService _userService;
        public VerifyEmailCommandHandler(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<string> Handle(VerifyEmailCommand request, CancellationToken cancellationToken)
        {
            return await _userService.VerifyEmail(request.Token, request.Email);
        }
    }
}