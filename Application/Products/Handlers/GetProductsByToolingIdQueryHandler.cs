using Application.Products.Queries;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products.Handlers
{
    public class GetProductsByToolingIdQueryHandler : IRequestHandler<GetProductsByToolingIdQuery, List<Product>>
    {
        private readonly DataContext _context;

        public GetProductsByToolingIdQueryHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<List<Product>> Handle(GetProductsByToolingIdQuery request, CancellationToken cancellationToken)
        {
            var products = await _context.Products
            .AsNoTracking()
            .Where(x => x.ToolingId == request.ToolingId)
            .Select(x => new Product { Id = x.Id, Name = x.Name, IsAllergen = x.IsAllergen, ToolingId = x.ToolingId })
            .ToListAsync();

            return products;
        }
    }
}