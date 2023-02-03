using Application.Services.Interfaces;
using Application.Users.Queries;
using MediatR;

namespace Application.Users.Handlers
{
    public class GetRolesQueryHandler : IRequestHandler<GetRolesQuery, List<string>>
    {
        private readonly IRoleService _roleService;
        public GetRolesQueryHandler(IRoleService roleService)
        {
            _roleService = roleService;
        }

        public async Task<List<string>> Handle(GetRolesQuery request, CancellationToken cancellationToken)
        {
            return await _roleService.GetRoles();
        }
    }
}