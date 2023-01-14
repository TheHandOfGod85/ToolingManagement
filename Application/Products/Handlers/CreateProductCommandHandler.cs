using MediatR;
using Persistence;
using Application.Products.Commands;

namespace Application.Products.Handlers
{
    public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, Product>
    {
        private readonly DataContext _context;

        public CreateProductCommandHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Product> Handle(CreateProductCommand request, CancellationToken cancellationToken)
        {
            var product = request.CreateProduct();
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return product;
        }
    }
}