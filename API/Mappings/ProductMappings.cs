using Application.DTOs.ProductDTO;
using Application.Products.Commands;
using AutoMapper;
using Domain;

namespace API.Mappings
{
    public class ProductMappings : Profile
    {
        public ProductMappings()
        {
            CreateMap<Product, ProductDto>();
            CreateMap<CreateProductDto, CreateProductCommand>();
            CreateMap<DeleteProductByToolingIdDto, DeleteProductByToolingIdCommand>();
        }
    }
}
