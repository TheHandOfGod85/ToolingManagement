using Application.DTOs.ImageDTO;
using Application.DTOs.ProductDTO;
using AutoMapper;
using Domain;

namespace Application.Core
{
    // a class for mapping the objects
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductDto>();
            CreateMap<Image, ImageDto>();

        }
    }
}
