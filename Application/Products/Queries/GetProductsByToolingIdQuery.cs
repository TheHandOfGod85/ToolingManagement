using Application.DTOs.ProductDTO;
using MediatR;

namespace Application.Products.Queries
{
    public class GetProductsByToolingIdQuery : IRequest<List<ProductDto>>
    {
        public Guid ToolingId { get; }
        public GetProductsByToolingIdQuery(Guid toolingId)
        {
            ToolingId = toolingId;

        }
    }
}