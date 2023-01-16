using Application.Core;
using Application.Interfaces;
using Application.Photos.Commands;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos.Handlers
{
    public class AddImagesCommandHandler : IRequestHandler<AddImagesCommand, ErrorResult<List<Image>>>
    {
        private readonly DataContext _context;
        private readonly IPhotoAccessor _photoAccessor;

        public AddImagesCommandHandler(DataContext context, IPhotoAccessor photoAccessor)
        {
            _context = context;
            _photoAccessor = photoAccessor;
        }
        public async Task<ErrorResult<List<Image>>> Handle(AddImagesCommand request, CancellationToken cancellationToken)
        {
            var tooling = await _context.Toolings
               .Include(p => p.Images)
               .FirstOrDefaultAsync(x => x.Id == request.ToolingId);

            if (tooling == null) return null;


            var photoUploadResults = await _photoAccessor.AddPhoto(request.Files);

            foreach (var photoUploadResult in photoUploadResults)
            {
                var image = new Image
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId,
                    ToolingId = tooling.Id
                };
                tooling.Images.Add(image);
            }

            var result = await _context.SaveChangesAsync() > 0;
            
            if (result) return ErrorResult<List<Image>>.Success((List<Image>)tooling.Images);
            return ErrorResult<List<Image>>.Failure("Problem adding image");
        }
    }
}
