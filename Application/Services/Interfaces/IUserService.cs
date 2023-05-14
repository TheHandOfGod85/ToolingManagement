using System.Security.Claims;
using Application.DTOs.User;
using Microsoft.AspNetCore.Mvc;

namespace Application.Services.Interfaces
{
    public interface IUserService
    {
        Task<string> RegisterUser(AppUser user, string password);
        Task<UserDto> Login(string email, string password);
        Task<UserDto> GetCurrentUser(ClaimsPrincipal user);
        Task<UserDto> RefreshToken(ClaimsPrincipal user);
        Task<string> VerifyEmail(string token, string email);
        Task<string> ResendEmailConfirmationLink(string email);

    }
}