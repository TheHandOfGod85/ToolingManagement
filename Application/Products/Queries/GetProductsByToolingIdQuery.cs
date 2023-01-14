using MediatR;

namespace Application.Products.Queries
{
    public class GetProductsByToolingIdQuery : IRequest<List<Product>>
    {
        public Guid ToolingId { get; }
        public GetProductsByToolingIdQuery(Guid toolingId)
        {
            ToolingId = toolingId;

        }
    }
}