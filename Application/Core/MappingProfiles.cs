using Application.DTOs.ImageDTO;
using Application.DTOs.ProductDTO;
using Application.DTOs.ToolingDTO;
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
            CreateMap<Product, Product>();
            CreateMap<Product, GetProductDto>();
            CreateMap<Tooling, GetToolingDto>()
            .ForMember(dto => dto.Products, o => o.MapFrom(
                tooling => tooling.Products))
                .ForMember(dto => dto.Images, o => o.MapFrom(
                    tooling => tooling.Images
                ))
                .ForMember(dto => dto.Image, o => o.MapFrom(tooling => tooling.Images.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<Image, ImageDto>();
            CreateMap<Tooling, ToolingDto>();
        }
    }
}