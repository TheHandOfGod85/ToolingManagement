using Application.Core;
using Application.Interfaces;
using Application.Photos.Commands;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos.Handlers
{
    public class DeleteImagesCommandHandler : IRequestHandler<DeleteImagesCommand, ErrorResult<Unit>>
    {
        private readonly DataContext _context;
        private readonly IPhotoAccessor _accessor;

        public DeleteImagesCommandHandler(DataContext context, IPhotoAccessor accessor)
        {
            _context = context;
            _accessor = accessor;
        }
        public async Task<ErrorResult<Unit>> Handle(DeleteImagesCommand request, CancellationToken cancellationToken)
        {
            var tooling = await _context.Toolings
                .Include(x => x.Images)
                .FirstOrDefaultAsync(x => x.Id == request.DeleteImage.ToolingId);
            if (tooling == null) return null;

            var image = tooling.Images.FirstOrDefault(x => x.Id == request.DeleteImage.ImageId);
            if (image == null) return null;

            if (image.IsMain) return ErrorResult<Unit>.Failure("You cannot delete the main image");
            var result = await _accessor.DeletePhoto(image.Id);
            if (result == null) return ErrorResult<Unit>.Failure("Problem deleting image from cloudinary");
            tooling.Images.Remove(image);

            var success = await _context.SaveChangesAsync() > 0;
            if (success) return ErrorResult<Unit>.Success(Unit.Value);
            return ErrorResult<Unit>.Failure("Problem deleting image from api");
        }
    }
}