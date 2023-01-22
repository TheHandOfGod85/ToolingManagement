using Application.Core;
using MediatR;

namespace Application.Products.Queries
{
    public class GetProductByIdQuery : IRequest<Product>
    {
        public string Id { get; set; }
        public GetProductByIdQuery(string id)
        {
            Id = id;
        }
    }
}