using System.Security.Claims;
using API.Attributes.ExceptionsAttributes;
using API.DTOs;
using Application.DTOs.User;
using Application.Implementations.Services;
using Application.Users.Commands;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly TokenService _tokenService;

        public AccountController(IMapper mapper, IMediator mediator, UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager, TokenService tokenService)
        {
            _mapper = mapper;
            _mediator = mediator;
            _userManager = userManager;
            _roleManager = roleManager;
            _tokenService = tokenService;
        }
        [UserException]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var command = _mapper.Map<LoginCommand>(loginDto);
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [UserException]
        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {

            var command = _mapper.Map<RegisterUserCommand>(registerDto);
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Token = _tokenService.CreateToken(user),
                UserName = user.UserName,
                Role = user.Role
            };
        }


        [HttpGet("roles")]
        public async Task<ActionResult<List<string>>> GetRoles()
        {
            var RolesList = await _roleManager.Roles.Select(x => x.Name).ToListAsync();

            if (RolesList == null)
            {
                ModelState.AddModelError("roles", "No roles were set");
                return ValidationProblem();
            }

            return RolesList;
        }

    }
}