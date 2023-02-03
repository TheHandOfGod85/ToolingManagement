using Application.DTOs.User;
using Application.Services.Interfaces;
using Application.Users.Queries;
using MediatR;

namespace Application.Users.Handlers
{
    public class GetCurrentUserQueryHandler : IRequestHandler<GetCurrentUserQuery, UserDto>
    {
        private readonly IUserService _userService;
        public GetCurrentUserQueryHandler(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<UserDto> Handle(GetCurrentUserQuery request, CancellationToken cancellationToken)
        {
            return await _userService.GetCurrentUser(request.user);
        }
    }
}