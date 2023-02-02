
using Application.DTOs.User;
using Application.Exceptions;
using Application.Implementations.Services;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Application.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;

        public UserService(UserManager<AppUser> userManager, TokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
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
                return CreateUserObject(user);
            }
            else
            {
                throw new UserException("Password was incorrect");
            }
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
    }
}