using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Products
{
    public class EditProduct
    {
        public class Command : IRequest<ErrorResult<Unit>>
        {
            public Product Product { get; set; }
        }

        public class Handler : IRequestHandler<Command, ErrorResult<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<ErrorResult<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var product = await _context.Products.FindAsync(request.Product.Id);
                if (product == null) return null;

                _mapper.Map(request.Product, product);

                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return ErrorResult<Unit>.Failure("Failed to update the product");
                return ErrorResult<Unit>.Success(Unit.Value);
            }
        }
    }
}