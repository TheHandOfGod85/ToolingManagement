using Application.Core;
using Application.Toolings.Validator;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Products
{
    public class CreateProduct
    {
        public class Command : IRequest<ErrorResult<Unit>>
        {
            public Product Product { get; set; }
        }


        // validator 
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Product).SetValidator(new ProductValidator());
            }
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
                _context.Products.Add(request.Product);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return ErrorResult<Unit>.Failure("Failed to create a new product");
                return ErrorResult<Unit>.Success(Unit.Value);
            }
        }
    }
}