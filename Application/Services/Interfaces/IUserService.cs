using Application.DTOs.User;

namespace Application.Services.Interfaces
{
    public interface IUserService
    {
        Task<bool> RegisterUser(AppUser user, string password);
        Task<UserDto> Login(string email, string password);
    }
}