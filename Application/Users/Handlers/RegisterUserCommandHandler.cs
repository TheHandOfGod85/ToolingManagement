using Application.Exceptions;
using Application.Services.Interfaces;
using Application.Users.Commands;
using AutoMapper;
using MediatR;

namespace Application.Users.Handlers
{
    public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, bool>
    {
        private readonly IRoleService _roleService;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public RegisterUserCommandHandler(IRoleService roleService, IUserService userService, IMapper mapper)
        {
            _mapper = mapper;
            _roleService = roleService;
            _userService = userService;
        }


        public async Task<bool> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            var user = _mapper.Map<AppUser>(request);
            var isRegistered = await _userService.RegisterUser(user, request.Password);
            if (isRegistered)
            {
                var isRoleAssigned = await _roleService.AssignRole(user, request.Role);
                if (isRoleAssigned) return true;
                throw new UserException("Role not assigned");
            }
            throw new UserException("User is not registered");
        }
    }
}