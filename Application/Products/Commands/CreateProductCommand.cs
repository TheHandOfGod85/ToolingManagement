using Application.Core;
using Application.DTOs.ProductDTO;
using MediatR;

namespace Application.Products.Commands
{
    public class CreateProductCommand : IRequest<ErrorResult<Unit>>
    {
        public CreateProductDto CreateProductDto { get; }
        public CreateProductCommand(CreateProductDto createProductDto)
        {
            CreateProductDto = createProductDto;

        }
    }
}