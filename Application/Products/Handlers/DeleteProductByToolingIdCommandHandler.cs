using Application.Core;
using Application.Products.Commands;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products.Handlers
{
    public class DeleteProductByToolingIdCommandHandler : IRequestHandler<DeleteProductByToolingIdCommand, ErrorResult<Unit>>
    {
        private readonly DataContext _context;

        public DeleteProductByToolingIdCommandHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<ErrorResult<Unit>> Handle(DeleteProductByToolingIdCommand request, CancellationToken cancellationToken)
        {
            var tooling = await _context.Toolings
            .Include(x => x.Products)
            .FirstOrDefaultAsync(x => x.Id == request.DeleteProduct.ToolingId);
            if (tooling == null) return null;

            var product = await _context.Products
            .FirstOrDefaultAsync(x => x.Id == request.DeleteProduct.ProductId);
            if (product == null) return null;

            tooling.Products.Remove(product);

            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return ErrorResult<Unit>.Failure("Failed to delete the product");
            return ErrorResult<Unit>.Success(Unit.Value);
        }
    }
}