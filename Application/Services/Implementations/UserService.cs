
using System.Security.Claims;
using System.Text;
using Application.DTOs.User;
using Application.Exceptions;
using Application.Implementations.Services;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;

namespace Application.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IEmailSender _emailSender;
        private readonly IWebHostEnvironment _webHostEnviroment;

        public UserService(UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager, TokenService tokenService,
         IHttpContextAccessor httpContextAccessor, IEmailSender emailSender, IWebHostEnvironment webHostEnviroment)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _httpContextAccessor = httpContextAccessor;
            _emailSender = emailSender;
            _webHostEnviroment = webHostEnviroment;
        }

        public async Task<UserDto> GetCurrentUser(ClaimsPrincipal user)
        {
            var email = user.FindFirstValue(ClaimTypes.Email);
            var appUser = await _userManager.FindByEmailAsync(email);
            return CreateUserObject(appUser);
        }

        public async Task<UserDto> Login(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                throw new UserException("Invalid email");
            }
            if (!user.EmailConfirmed)
            {
                throw new UserException("Email not confirmed");
            }
            var result = await _signInManager.CheckPasswordSignInAsync(user, password, false);
            if (result.Succeeded)
            {
                await SetRefreshToken(user);
                return CreateUserObject(user);
            }
            else
            {
                throw new UserException("Invalid password");
            }
        }

        public async Task<UserDto> RefreshToken(ClaimsPrincipal user)
        {
            var refreshToken = _httpContextAccessor.HttpContext.Request.Cookies["refreshToken"];
            var email = user.FindFirstValue(ClaimTypes.Email);
            var appUser = await _userManager.FindByEmailAsync(email);
            if (appUser == null) throw new UserException("Please log in again");
            var oldToken = appUser.RefreshTokens.SingleOrDefault(x => x.Token == refreshToken);
            if (oldToken != null && !oldToken.IsActive) throw new UserException("Please log in again");
            if (oldToken != null) oldToken.Revoked = DateTime.UtcNow;
            return CreateUserObject(appUser);
        }

        public async Task<string> RegisterUser(AppUser user, string password)
        {
            if (!_userManager.Users.Any(x => x.Email == user.Email))
            {
                var result = await _userManager.CreateAsync(user, password);
                if (!result.Succeeded)
                {
                    throw new UserException($"{result.Errors.FirstOrDefault().Description}");
                }
                var origin = _httpContextAccessor.HttpContext.Request.Headers["origin"];
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));
                var verifyUrl = $"{origin}/account/verifyEmail?token={token}&email={user.Email}";
                var pathToFile = _webHostEnviroment.WebRootPath + Path.DirectorySeparatorChar.ToString()
                + "Templates" + Path.DirectorySeparatorChar.ToString() + "EmailConfirmationTemplate.html";
                string htmlBody = "";
                using (StreamReader streamReader = System.IO.File.OpenText(pathToFile))
                {
                    htmlBody = streamReader.ReadToEnd();
                }
                //{0}=name
                //{1}=message
                //{2}=url
                htmlBody = htmlBody.Replace("{0}", user.DisplayName);
                htmlBody = htmlBody.Replace("{1}", verifyUrl);
                htmlBody = htmlBody.Replace("{2}", verifyUrl);
                await _emailSender.SendEmailAsync(user.Email, "Please verify email", htmlBody);
                return "Registration success - please verify email";
            }
            throw new UserException("Email does already exist!");
        }

        public async Task<string> ResendEmailConfirmationLink(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) throw new UserException("Email not found");
            var origin = _httpContextAccessor.HttpContext.Request.Headers["origin"];
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));
            var verifyUrl = $"{origin}/account/verifyEmail?token={token}&email={user.Email}";
            var message = $"<p>Please click the below link to verify your email address:<p/><p><a href=`{verifyUrl}`>Click to verify email<a/><p/>";
            await _emailSender.SendEmailAsync(user.Email, "Please verify email", message);
            return "Email verification link resent";
        }

        public async Task<string> VerifyEmail(string token, string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) throw new UserException("Email not found");
            var decodedTokenBytes = WebEncoders.Base64UrlDecode(token);
            var decodedToken = Encoding.UTF8.GetString(decodedTokenBytes);
            var result = await _userManager.ConfirmEmailAsync(user, decodedToken);
            if (!result.Succeeded) throw new UserException("Could not verify email address");
            return "Email confirmed - you can now login";
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
        private async Task SetRefreshToken(AppUser user)
        {
            var refreshToken = _tokenService.GenerateRefreshToken();
            user.RefreshTokens.Add(refreshToken);
            await _userManager.UpdateAsync(user);
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7)
            };
            _httpContextAccessor.HttpContext.Response.Cookies.Append("refreshToken", refreshToken.Token, cookieOptions);
        }
    }
}