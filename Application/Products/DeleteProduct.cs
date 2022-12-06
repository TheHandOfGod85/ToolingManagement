using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Products
{
    public class DeleteProduct
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var product = await _context.Products.FindAsync(request.Id);
                _context.Remove(product);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}