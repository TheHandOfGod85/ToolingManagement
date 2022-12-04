using AutoMapper;
using Domain;

namespace Application.Core
{
    // a class for mapping the objects
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Tooling, Tooling>();
        }
    }
}