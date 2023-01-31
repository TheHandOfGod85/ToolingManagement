using Application.DTOs.User;
using MediatR;

namespace Application.Users.Commands
{
    public class LoginCommand : IRequest<UserDto>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}