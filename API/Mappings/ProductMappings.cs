using Application.DTOs.ProductDTO;
using AutoMapper;
using Domain;

namespace API.Mappings
{
    public class ProductMappings : Profile
    {
        protected ProductMappings()
        {
            CreateMap<Product, ProductDto>();
        }
    }
}