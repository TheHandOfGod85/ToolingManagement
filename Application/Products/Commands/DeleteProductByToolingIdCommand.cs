using Application.Core;
using Application.DTOs.ProductDTO;
using MediatR;

namespace Application.Products.Commands
{
    public class DeleteProductByToolingIdCommand : IRequest<ErrorResult<Unit>>
    {
        public DeleteProductByToolingIdDto DeleteProduct { get; }
        public DeleteProductByToolingIdCommand(DeleteProductByToolingIdDto deleteProduct)
        {
            DeleteProduct = deleteProduct;
        }
    }
}