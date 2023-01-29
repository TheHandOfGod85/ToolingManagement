using Microsoft.AspNetCore.Identity;

namespace Application.Services.Interfaces
{
    public interface IUserService
    {
        Task<bool> RegisterUser(AppUser user, string password);
    }
}