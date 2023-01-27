using Application.Core;
using Application.Toolings.Commands;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Toolings.Handlers
{
    public class UpdateToolingCommandHandler : IRequestHandler<UpdateToolingCommand, ErrorResult<Tooling>>
    {
        private readonly DataContext _context;
        public UpdateToolingCommandHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<ErrorResult<Tooling>> Handle(UpdateToolingCommand request, CancellationToken cancellationToken)
        {
            var tooling = await _context.Toolings.FirstOrDefaultAsync(x => x.Id == request.Id);
            if (tooling is null)
                return null;

            tooling.Note = request.Note;
            tooling.TNumber = request.TNumber;
            tooling.PSNumber = request.PSNumber;
            tooling.Quantity = request.Quantity;
            tooling.Department = request.Department;
            tooling.IsInProduction = request.IsInProduction;
            tooling.NumberOfImpressions = request.NumberOfImpressions;
            tooling.PunnetNumber = request.PunnetNumber;

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return ErrorResult<Tooling>.Failure("Problem Updating the tooling");
            return ErrorResult<Tooling>.Success(tooling);
        }
    }
}
