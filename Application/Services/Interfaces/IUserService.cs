using System.Security.Claims;
using Application.DTOs.User;
using Microsoft.AspNetCore.Mvc;

namespace Application.Services.Interfaces
{
    public interface IUserService
    {
        Task<ActionResult> RegisterUser(AppUser user, string password);
        Task<UserDto> Login(string email, string password);
        Task<UserDto> GetCurrentUser(ClaimsPrincipal user);
        Task<UserDto> RefreshToken(ClaimsPrincipal user);
        Task<ActionResult> VerifyEmail(string token, string email);
        Task<ActionResult> ResendEmailConfirmationLink(string email);

    }
}