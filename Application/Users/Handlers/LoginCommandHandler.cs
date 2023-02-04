using Application.DTOs.User;
using Application.Exceptions;
using Application.Services.Interfaces;
using Application.Users.Commands;
using AutoMapper;
using MediatR;

namespace Application.Users.Handlers
{
    public class LoginCommandHandler : IRequestHandler<LoginCommand, UserDto>
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        public LoginCommandHandler(IUserService userService, IMapper mapper)
        {
            _mapper = mapper;
            _userService = userService;

        }
        public Task<UserDto> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            var user = _mapper.Map<LoginCommand>(request);
            var userLoggedIn = _userService.Login(request.Email, request.Password);
            if (userLoggedIn == null) throw new UserException("Problem logging in, check your credentials");
            return userLoggedIn;
        }
    }
}