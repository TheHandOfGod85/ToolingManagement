using Application.Core;
using Application.Products.Commands;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products.Handlers
{
    public class DeleteProductByToolingIdCommandHandler : IRequestHandler<DeleteProductByToolingIdCommand, bool>
    {
        private readonly DataContext _context;

        public DeleteProductByToolingIdCommandHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<bool> Handle(DeleteProductByToolingIdCommand request, CancellationToken cancellationToken)
        {
            var tooling = await _context.Toolings
            .FirstOrDefaultAsync(x => x.Id == request.ToolingId);
            if (tooling is null) return false;

            var product = await _context.Products
            .FirstOrDefaultAsync(x => x.Id == request.ProductId);
            if (product is null) return false;

            tooling.Products.Remove(product);
            _context.Products.Remove(product);

            var result = await _context.SaveChangesAsync() > 0;
            return result;
        }
    }
}