using API.DTOs.Products;
using Application.DTOs.ProductDTO;
using Application.Products.Commands;
using Application.Products.Queries;
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
            CreateMap<EditProductDto, EditProductCommand>();
            CreateMap<ProductDto, GetProductByIdQuery>();
        }
    }
}
