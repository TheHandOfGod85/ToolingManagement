using Application.DTOs.ProductDTO;
using Application.Products.Queries;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products.Handlers
{
    public class GetProductsByToolingIdQueryHandler : IRequestHandler<GetProductsByToolingIdQuery, List<ProductDto>>
    {
        private readonly DataContext _context;

        public GetProductsByToolingIdQueryHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<List<ProductDto>> Handle(GetProductsByToolingIdQuery request, CancellationToken cancellationToken)
        {
            var products = await _context.Products
            .AsNoTracking()
            .Where(x => x.ToolingId == request.ToolingId)
            .Select(x => new ProductDto { Id = x.Id, Name = x.Name, IsAllergen = x.IsAllergen, ToolingId = x.ToolingId })
            .ToListAsync();

            return products;
        }
    }
}