using MediatR;

namespace Application.Users.Commands
{
    public class RegisterUserCommand : IRequest<AppUser>
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string DisplayName { get; set; }
        public string Username { get; set; }
        public string Role { get; set; }
    }
}