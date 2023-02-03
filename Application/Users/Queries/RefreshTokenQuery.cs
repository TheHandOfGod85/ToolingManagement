using System.Security.Claims;
using Application.DTOs.User;
using MediatR;

namespace Application.Users.Queries
{
    public class RefreshTokenQuery : IRequest<UserDto>
    {
        public ClaimsPrincipal user { get; set; }
        public RefreshTokenQuery(ClaimsPrincipal user)
        {
            this.user = user;
        }
    }
}