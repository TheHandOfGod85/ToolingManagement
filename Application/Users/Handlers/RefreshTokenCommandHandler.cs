using Application.DTOs.User;
using Application.Services.Interfaces;
using Application.Users.Queries;
using MediatR;

namespace Application.Users.Handlers
{
    public class RefreshTokenCommandHandler : IRequestHandler<RefreshTokenQuery, UserDto>
    {
        private readonly IUserService _userService;
        public RefreshTokenCommandHandler(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<UserDto> Handle(RefreshTokenQuery request, CancellationToken cancellationToken)
        {
            return await _userService.RefreshToken(request.user);
        }
    }
}