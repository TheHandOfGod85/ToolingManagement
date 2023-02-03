namespace Application.Services.Interfaces
{
    public interface IRoleService
    {
        Task<bool> AssignRole(AppUser user, string role);
        Task InitiateRoles();
        Task<List<string>> GetRoles();
    }
}