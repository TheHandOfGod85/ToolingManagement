
using System.Security.Claims;
using Application.DTOs.User;
using Application.Exceptions;
using Application.Implementations.Services;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;
        private readonly IHttpContextAccessor _httpContextAccessor;



        public UserService(UserManager<AppUser> userManager, TokenService tokenService, IHttpContextAccessor httpContextAccessor)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<UserDto> GetCurrentUser(ClaimsPrincipal user)
        {
            var email = user.FindFirstValue(ClaimTypes.Email);
            var appUser = await _userManager.FindByEmailAsync(email);
            return CreateUserObject(appUser);
        }

        public async Task<UserDto> Login(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                throw new UserException("Email was not found");
            }
            var result = await _userManager.CheckPasswordAsync(user, password);
            if (result)
            {
                await SetRefreshToken(user);
                return CreateUserObject(user);
            }
            else
            {
                throw new UserException("Password was incorrect");
            }
        }

        public async Task<UserDto> RefreshToken(ClaimsPrincipal user)
        {
            var refreshToken = _httpContextAccessor.HttpContext.Request.Cookies["refreshToken"];
            var appUser = await _userManager.Users
            .Include(r => r.RefreshTokens)
            .FirstOrDefaultAsync(x => x.UserName == user.FindFirstValue(ClaimTypes.Name));
            if (user == null) throw new UserException("Please log in again");

            var oldToken = appUser.RefreshTokens.SingleOrDefault(x => x.Token == refreshToken);
            if (oldToken != null && !oldToken.IsActive) throw new UserException("Please log in again");
            return CreateUserObject(appUser);
        }

        public async Task<AppUser> RegisterUser(AppUser user, string password)
        {
            if (!_userManager.Users.Any(x => x.Email == user.Email))
            {
                var result = await _userManager.CreateAsync(user, password);
                if (!result.Succeeded)
                {
                    throw new UserException($"{result.Errors.FirstOrDefault().Description}");
                }
                await SetRefreshToken(user);
                return user;
            }
            throw new UserException("Email does already exist!");
        }

        private UserDto CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Token = _tokenService.CreateToken(user),
                UserName = user.UserName,
                Role = user.Role
            };
        }
        private async Task SetRefreshToken(AppUser user)
        {
            var refreshToken = _tokenService.GenerateRefreshToken();
            user.RefreshTokens.Add(refreshToken);
            await _userManager.UpdateAsync(user);
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7)
            };
            _httpContextAccessor.HttpContext.Response.Cookies.Append("refreshToken", refreshToken.Token, cookieOptions);
        }
    }
}