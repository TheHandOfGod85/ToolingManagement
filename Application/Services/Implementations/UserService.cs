using Application.Exceptions;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Application.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly UserManager<AppUser> _userManager;

        public UserService(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<bool> RegisterUser(AppUser user, string password)
        {
            if (!_userManager.Users.Any(x => x.Email == user.Email))
            {
                var result = await _userManager.CreateAsync(user, password);
                if (!result.Succeeded)
                {
                    throw new UserException($"{result.Errors.FirstOrDefault().Description}");
                }
                return result.Succeeded;
            }
            throw new UserException("Email does already exist!");
        }
    }
}