using Application.DTOs.ImageDTO;
using AutoMapper;

namespace Application.Core
{
    // a class for mapping the objects
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {

            CreateMap<Image, ImageDto>();

        }
    }
}
