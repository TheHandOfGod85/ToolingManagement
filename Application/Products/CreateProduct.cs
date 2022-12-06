using Application.DTOs.ProductDTO;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Products
{
    public class CreateProduct
    {
        public class Command : IRequest
        {
            public Product Product { get; set; }
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
                _context.Products.Add(request.Product);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}