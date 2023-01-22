using Application.Core;
using Application.Products.Commands;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products.Handlers
{
    public class EditProductCommandHandler : IRequestHandler<EditProductCommand, ErrorResult<Unit>>
    {
        private readonly DataContext _context;
        public EditProductCommandHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<ErrorResult<Unit>> Handle(EditProductCommand request, CancellationToken cancellationToken)
        {
            var product = await _context.Products.FirstOrDefaultAsync(x => x.Id == request.Id);
            if (product is null) return null;

            product.Name = request.Name;
            product.IsAllergen = request.IsAllergen;

            var result = await _context.SaveChangesAsync() > 0;

            return ErrorResult<Unit>.Success(Unit.Value);

        }
    }
}