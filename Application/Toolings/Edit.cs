using Application.Core;
using Application.DTOs.ToolingDTO;
using Application.Toolings.Validator;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Toolings
{
    public class Edit
    {
        public class Command : IRequest<ErrorResult<Unit>>
        {
            public ToolingDto ToolingDto { get; set; }
        }

        // validator 
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.ToolingDto).SetValidator(new ToolingValidator());
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
                var tooling = await _context.Toolings
                .Include(x => x.Products)
                .FirstOrDefaultAsync(x => x.Id == request.ToolingDto.Id);
                if (tooling == null) return null;

                _mapper.Map(request.ToolingDto, tooling);

                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return ErrorResult<Unit>.Failure("Failed to update the tooling");
                return ErrorResult<Unit>.Success(Unit.Value);
            }
        }
    }
}