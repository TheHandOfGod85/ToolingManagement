using API.Attributes.ExceptionsAttributes;
using API.DTOs;
using Application.DTOs.User;
using Application.Users.Commands;
using Application.Users.Queries;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;

        public AccountController(IMapper mapper, IMediator mediator)
        {
            _mapper = mapper;
            _mediator = mediator;
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
            var query = new GetCurrentUserQuery(User);
            var result = await _mediator.Send(query);
            return Ok(result);
        }


        [HttpGet("roles")]
        public async Task<ActionResult<List<string>>> GetRoles()
        {
            var query = new GetRolesQuery();
            var result = await _mediator.Send(query);
            return Ok(result);
        }
        [Authorize]
        [HttpPost("refreshToken")]
        public async Task<ActionResult<UserDto>> RefreshToken()
        {
            var query = new RefreshTokenQuery(User);
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpPost("verifyEmail")]
        public async Task<IActionResult> VerifyEmail(string token, string email)
        {
            var command = new VerifyEmailCommand(token, email);
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpGet("resendEmailConfirmationLink")]
        public async Task<IActionResult> ResendEmailConfirmationLink(string email)
        {
            var query = new ResendEmailConfirmationQuery(email);
            var result = await _mediator.Send(query);
            return Ok(result);
        }

    }
}