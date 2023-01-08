using Application.Core;
using Application.DTOs.ImageDTO;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Add
    {
        public class Command : IRequest<ErrorResult<List<ImageDto>>>
        {
            public AddImagesDto AddImagesDto { get; set; }
        }

        public class Handler : IRequestHandler<Command, ErrorResult<List<ImageDto>>>
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

            public async Task<ErrorResult<List<ImageDto>>> Handle(Command request, CancellationToken cancellationToken)
            {
                var tooling = await _context.Toolings
                .Include(p => p.Images)
                .FirstOrDefaultAsync(x => x.Id == request.AddImagesDto.ToolingId);

                if (tooling == null) return null;


                var photoUploadResults = await _photoAccessor.AddPhoto(request.AddImagesDto.Files);

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
                var toolingImages = tooling.Images;
                var toolingImagesDto = _mapper.Map<List<ImageDto>>(toolingImages);


                if (result) return ErrorResult<List<ImageDto>>.Success(toolingImagesDto);
                return ErrorResult<List<ImageDto>>.Failure("Problem adding image");
            }
        }
    }
}