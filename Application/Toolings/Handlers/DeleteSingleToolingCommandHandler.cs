using Application.Core;
using Application.Interfaces;
using Application.Toolings.Commands;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Toolings.Handlers
{
    public class DeleteSingleToolingCommandHandler : IRequestHandler<DeleteSingleToolingCommand, ErrorResult<Unit>>
    {
        private readonly DataContext _context;
        private readonly IPhotoAccessor _photoAccessor;
        public DeleteSingleToolingCommandHandler(DataContext context, IPhotoAccessor photoAccessor)
        {
            _photoAccessor = photoAccessor;
            _context = context;

        }
        public async Task<ErrorResult<Unit>> Handle(DeleteSingleToolingCommand request, CancellationToken cancellationToken)
        {
            var tooling = await _context.Toolings
                .Include(x => x.Images)
                .FirstOrDefaultAsync(x => x.Id == request.Id);
            if (tooling == null) return null;
            foreach (var img in tooling.Images)
            {
                await _photoAccessor.DeletePhoto(img.Id);
            }
            _context.Remove(tooling);
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return ErrorResult<Unit>.Failure("Failed to delete the tooling");
            return ErrorResult<Unit>.Success(Unit.Value);
        }
    }
}