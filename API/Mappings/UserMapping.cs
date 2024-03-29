using API.DTOs;
using Application.DTOs.User;
using Application.Users.Commands;
using AutoMapper;
using Domain;

namespace API.Mappings
{
    public class UserMapping : Profile
    {
        public UserMapping()
        {
            CreateMap<RegisterDto, RegisterUserCommand>();
            CreateMap<RegisterUserCommand, AppUser>();
            CreateMap<LoginDto, LoginCommand>();
            CreateMap<LoginCommand, UserDto>();
            CreateMap<LoginCommand, LoginDto>();
        }
    }
}