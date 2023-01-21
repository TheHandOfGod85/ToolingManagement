using Application.Core;
using Application.Photos.Commands;
using MediatR;
using Persistence;

namespace Application.Photos.Handlers
{
    public class UnsetMainImageCommandHandler : IRequestHandler<UnsetMainImageCommand, ErrorResult<Unit>>
    {
        private readonly DataContext _context;
        public UnsetMainImageCommandHandler(DataContext context)
        {
            _context = context;

        }
        public async Task<ErrorResult<Unit>> Handle(UnsetMainImageCommand request, CancellationToken cancellationToken)
        {

            var image = _context.Images.FirstOrDefault(x => x.Id == request.ImageId);
            if (image == null) return null;
            if (image.IsMain is false)
            {
                return ErrorResult<Unit>.Failure("The Image is not main already!!");
            }
            else
            {
                image.IsMain = false;
            }
            await _context.SaveChangesAsync();

            return ErrorResult<Unit>.Success(Unit.Value);
        }
    }
}