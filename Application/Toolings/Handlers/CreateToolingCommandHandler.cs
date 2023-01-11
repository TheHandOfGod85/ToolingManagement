using Application.Core;
using Application.Interfaces;
using Application.Toolings.Commands;
using Application.Toolings.Validator;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;


namespace Application.Toolings.Handlers
{
    public class CreateToolingCommandHandler : IRequestHandler<CreateToolingCommand, ErrorResult<Unit>>
    {
        private readonly DataContext _context;
        private readonly IPhotoAccessor _photoAccessor;
        private readonly IMapper _mapper;

        public CreateToolingCommandHandler(DataContext context, IPhotoAccessor photoAccessor, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
            _photoAccessor = photoAccessor;
        }

        // validator 
        public class CommandValidator : AbstractValidator<CreateToolingCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.ToolingDto).SetValidator(new ToolingValidator());
            }
        }

        public async Task<ErrorResult<Unit>> Handle(CreateToolingCommand request, CancellationToken cancellationToken)
        {
            if (Guid.TryParse(request.ToolingDto.Id.ToString(), out Guid guidResult))
            {
                request.ToolingDto.Id = Guid.NewGuid();
            }
            var images = new List<Image>();
            var products = new List<Product>();
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
            foreach (var product in request.ToolingDto.Products)
            {
                var newProduct = new Product
                {
                    Id = product.Id,
                    Name = product.Name,
                    IsAllergen = product.IsAllergen,
                    ToolingId = request.ToolingDto.Id
                };
                products.Add(newProduct);
            }
            _context.Products.AddRange(products);
            _context.Images.AddRange(images);
            var tooling = _mapper.Map<Tooling>(request.ToolingDto);
            await _context.Toolings.AddAsync(tooling);

            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return ErrorResult<Unit>.Failure("Failed to create a new tooling");

            return ErrorResult<Unit>.Success(Unit.Value);
        }
    }
}