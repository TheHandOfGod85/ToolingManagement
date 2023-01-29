using System.Security.Claims;
using API.Attributes.ExceptionsAttributes;
using API.DTOs;
using API.Services;
using API.Utilities;
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
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;

        public AccountController(UserManager<AppUser> userManager, TokenService tokenService, RoleManager<IdentityRole> roleManager, IMapper mapper, IMediator mediator)
        {
            _roleManager = roleManager;
            _mapper = mapper;
            _mediator = mediator;
            _userManager = userManager;
            _tokenService = tokenService;
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null)
            {
                ModelState.AddModelError("email", "Email was not found or incorrect");
                return ValidationProblem();
            }

            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);
            if (result)
            {
                return CreateUserObject(user);
            }
            ModelState.AddModelError("password", "Password was incorrect");
            return ValidationProblem();
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
            return CreateUserObject(user);
        }

        private UserDto CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Token = _tokenService.CreateToken(user),
                UserName = user.UserName,
                Role = user.Role
            };
        }

        private async void CreateRoles()
        {
            if (!_roleManager.RoleExistsAsync(Roles.Admin).GetAwaiter().GetResult())
            {
                await _roleManager.CreateAsync(new IdentityRole(Roles.Admin));
                await _roleManager.CreateAsync(new IdentityRole(Roles.Basic));
            }
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