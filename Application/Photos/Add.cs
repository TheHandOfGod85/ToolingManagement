using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Add
    {
        public class Command : IRequest<ErrorResult<Image>>
        {
            public IFormFile File { get; set; }
            public Guid ToolingId { get; set; }
        }

        public class Handler : IRequestHandler<Command, ErrorResult<Image>>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;

            public Handler(DataContext context, IPhotoAccessor photoAccessor)
            {
                _context = context;
                _photoAccessor = photoAccessor;
            }

            public async Task<ErrorResult<Image>> Handle(Command request, CancellationToken cancellationToken)
            {
                var tooling = await _context.Toolings
                .Include(p => p.Images)
                .FirstOrDefaultAsync(x => x.Id == request.ToolingId);

                if (tooling == null) return null;

                var photoUploadResult = await _photoAccessor.AddPhoto(request.File);

                var image = new Image
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId
                };
                if (!tooling.Images.Any(x => x.IsMain)) image.IsMain = true;

                tooling.Images.Add(image);
                var result = await _context.SaveChangesAsync() > 0;

                if (result) return ErrorResult<Image>.Success(image);
                return ErrorResult<Image>.Failure("Problem adding image");
            }
        }
    }
}