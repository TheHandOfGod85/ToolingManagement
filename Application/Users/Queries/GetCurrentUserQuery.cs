using System.Security.Claims;
using Application.DTOs.User;
using MediatR;

namespace Application.Users.Queries
{
    public class GetCurrentUserQuery : IRequest<UserDto>
    {
        public GetCurrentUserQuery(ClaimsPrincipal user)
        {
            this.user = user;
        }
        public ClaimsPrincipal user { get; set; }
    }
}