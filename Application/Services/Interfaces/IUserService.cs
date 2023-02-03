using System.Security.Claims;
using Application.DTOs.User;

namespace Application.Services.Interfaces
{
    public interface IUserService
    {
        Task<AppUser> RegisterUser(AppUser user, string password);
        Task<UserDto> Login(string email, string password);
        Task<UserDto> GetCurrentUser(ClaimsPrincipal user);
        Task<UserDto> RefreshToken(ClaimsPrincipal user);

    }
}