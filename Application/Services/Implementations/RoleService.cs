using Application.Constants;
using Application.Exceptions;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Application.Services.Implementations
{
    public class RoleService : IRoleService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public RoleService(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<bool> AssignRole(AppUser user, string role = Roles.Basic)
        {
            var result = await _userManager.AddToRoleAsync(user, role);
            if (result.Succeeded) return true;
            throw new UserException($"Role not assigned. Reason:{result.Errors.FirstOrDefault().Description}");
        }

        public async Task InitiateRoles()
        {
            if (!_roleManager.RoleExistsAsync(Roles.Admin).GetAwaiter().GetResult())
            {
                await _roleManager.CreateAsync(new IdentityRole(Roles.Admin));
                await _roleManager.CreateAsync(new IdentityRole(Roles.Basic));
            }
        }
    }
}