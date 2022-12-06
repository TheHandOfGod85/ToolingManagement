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
            CreateMap<Product, GetProductDto>()
            .ForMember(dto => dto.ToolingId, o => o.MapFrom(product => product.Tooling.Id));
            CreateMap<Tooling, GetToolingDto>()
            .ForMember(dto => dto.Products, o => o.MapFrom(
                tooling => tooling.Products));
        }
    }
}