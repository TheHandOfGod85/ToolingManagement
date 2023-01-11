using Application.Core;
using Application.Photos.Commands;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos.Handlers
{
    public class SetMainImageCommandHandler : IRequestHandler<SetMainImageCommand, ErrorResult<Unit>>
    {
        private readonly DataContext _context;
        public SetMainImageCommandHandler(DataContext context)
        {
            _context = context;

        }
        public async Task<ErrorResult<Unit>> Handle(SetMainImageCommand request, CancellationToken cancellationToken)
        {
            var tooling = await _context.Toolings
                 .Include(x => x.Images)
                 .FirstOrDefaultAsync(x => x.Id == request.SetMain.ToolingId);
            if (tooling == null) return null;

            var image = tooling.Images.FirstOrDefault(x => x.Id == request.SetMain.ImageId);
            if (image == null) return null;

            var mainImage = tooling.Images.FirstOrDefault(x => x.IsMain);
            if (mainImage != null) mainImage.IsMain = false;

            image.IsMain = true;
            var success = await _context.SaveChangesAsync() > 0;
            if (success) return ErrorResult<Unit>.Success(Unit.Value);
            return ErrorResult<Unit>.Failure("Problem setting the main image");
        }
    }
}