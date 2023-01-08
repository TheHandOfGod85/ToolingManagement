using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Toolings
{
    public class Delete
    {
        public class Command : IRequest<ErrorResult<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, ErrorResult<Unit>>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;

            public Handler(DataContext context, IPhotoAccessor photoAccessor)
            {
                _context = context;
                _photoAccessor = photoAccessor;
            }

            public async Task<ErrorResult<Unit>> Handle(Command request, CancellationToken cancellationToken)
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

}