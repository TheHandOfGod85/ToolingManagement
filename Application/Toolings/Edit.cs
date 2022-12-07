using Application.Core;
using Application.Toolings.Validator;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Toolings
{
    public class Edit
    {
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
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<ErrorResult<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var tooling = await _context.Toolings.FindAsync(request.Tooling.Id);
                if (tooling == null) return null;

                _mapper.Map(request.Tooling, tooling);

                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return ErrorResult<Unit>.Failure("Failde to update the tooling");
                return ErrorResult<Unit>.Success(Unit.Value);
            }
        }
    }
}