using Application.Core;
using Application.DTOs.ToolingDTO;
using Application.Interfaces;
using Application.Toolings.Validator;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Toolings
{
    public class Create
    {
        // a command following the  CQRS pattern allos to modify the database
        public class Command : IRequest<ErrorResult<Unit>>
        {
            public ToolingDto ToolingDto { get; set; }
        }

        // validator 
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.ToolingDto).SetValidator(new ToolingValidator());
            }
        }

        public class Handler : IRequestHandler<Command, ErrorResult<Unit>>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IPhotoAccessor photoAccessor, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
                _photoAccessor = photoAccessor;
            }

            public async Task<ErrorResult<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                if (Guid.TryParse(request.ToolingDto.Id.ToString(), out Guid guidResult))
                {
                    request.ToolingDto.Id = Guid.NewGuid();
                }
                var images = new List<Image>();
                var uploadedImages = await _photoAccessor.AddPhoto(request.ToolingDto.Files);
                foreach (var image in uploadedImages)
                {
                    var img = new Image
                    {
                        Url = image.Url,
                        Id = image.PublicId,
                        ToolingId = request.ToolingDto.Id
                    };
                    images.Add(img);
                };
                _context.Images.AddRange(images);
                var tooling = _mapper.Map<Tooling>(request.ToolingDto);
                await _context.Toolings.AddAsync(tooling);

                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return ErrorResult<Unit>.Failure("Failed to create a new tooling");

                return ErrorResult<Unit>.Success(Unit.Value);
            }
        }
    }
}