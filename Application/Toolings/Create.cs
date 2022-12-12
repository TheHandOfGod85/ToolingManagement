using Application.Core;
using Application.Toolings.Validator;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Toolings
{
    public class Create
    {
        // a command following the  CQRS pattern allos to modify the database
        public class Command : IRequest<ErrorResult<Unit>>
        {
            public Tooling Tooling { get; set; }
        }

        // validator 
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Tooling).SetValidator(new ToolingValidator());
            }
        }

        public class Handler : IRequestHandler<Command, ErrorResult<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<ErrorResult<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Toolings.Add(request.Tooling);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return ErrorResult<Unit>.Failure("Failed to create a new tooling");

                return ErrorResult<Unit>.Success(Unit.Value);
            }
        }
    }
}