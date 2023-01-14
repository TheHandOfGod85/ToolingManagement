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
    public class UpdateToolingCommandHandler : IRequestHandler<UpdateToolingCommand, bool>
    {
        private readonly DataContext _context;
        public UpdateToolingCommandHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(UpdateToolingCommand request, CancellationToken cancellationToken)
        {
            var tooling = await _context.Toolings.FirstOrDefaultAsync(x => x.Id == request.Id);
            if (tooling is null)
                return false;

            tooling.Note = request.Note;
            tooling.TNumber = request.TNumber;
            tooling.PSNumber = request.PSNumber;
            tooling.Quantity = request.Quantity;
            tooling.Department = request.Department;
            tooling.IsInProduction = request.IsInProduction;
            tooling.NumberOfImpressions = request.NumberOfImpressions;
         
            var result = await _context.SaveChangesAsync() > 0;
            return result;
        }
    }
}
