using Application.Core;
using Application.DTOs.ImageDTO;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Add
    {
        public class Command : IRequest<ErrorResult<ImageDto>>
        {
            public IFormFile File { get; set; }
            public Guid ToolingId { get; set; }
        }

        public class Handler : IRequestHandler<Command, ErrorResult<ImageDto>>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IPhotoAccessor photoAccessor, IMapper mapper)
            {
                _context = context;
                _photoAccessor = photoAccessor;
                _mapper = mapper;
            }

            public async Task<ErrorResult<ImageDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var tooling = await _context.Toolings
                .Include(p => p.Images)
                .FirstOrDefaultAsync(x => x.Id == request.ToolingId);

                if (tooling == null) return null;

                var photoUploadResult = await _photoAccessor.AddPhoto(request.File);

                var image = new Image
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId,
                    ToolingId = tooling.Id
                };

                if (!tooling.Images.Any(x => x.IsMain)) image.IsMain = true;

                tooling.Images.Add(image);
                var result = await _context.SaveChangesAsync() > 0;
                ImageDto imageDto = _mapper.Map<ImageDto>(image);


                if (result) return ErrorResult<ImageDto>.Success(imageDto);
                return ErrorResult<ImageDto>.Failure("Problem adding image");
            }
        }
    }
}