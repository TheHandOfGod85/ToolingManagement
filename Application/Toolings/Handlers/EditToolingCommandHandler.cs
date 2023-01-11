using Application.Core;
using Application.Toolings.Commands;
using Application.Toolings.Validator;
using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Toolings.Handlers
{
    public class EditToolingCommandHandler : IRequestHandler<EditToolingCommand, ErrorResult<Unit>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public EditToolingCommandHandler(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }

        // validator 
        public class CommandValidator : AbstractValidator<EditToolingCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.ToolingDto).SetValidator(new ToolingValidator());
            }
        }

        public async Task<ErrorResult<Unit>> Handle(EditToolingCommand request, CancellationToken cancellationToken)
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