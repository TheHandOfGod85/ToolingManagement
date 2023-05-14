using Application.Exceptions;
using Application.Services.Interfaces;
using Application.Users.Commands;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Application.Users.Handlers
{
    public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, string>
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


        public async Task<string> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            var user = _mapper.Map<AppUser>(request);
            var isRegistered = await _userService.RegisterUser(user, request.Password);
            if (isRegistered is not null)
            {
                var isRoleAssigned = await _roleService.AssignRole(user, request.Role);
                return isRegistered;
            }
            throw new UserException("User is not registered");
        }
    }
}