using Application.Services.Interfaces;
using Application.Toolings.Commands;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Toolings.Handlers
{
    public class DeleteSingleToolingCommandHandler : IRequestHandler<DeleteSingleToolingCommand, bool>
    {
        private readonly DataContext _context;
        private readonly IPhotoAccessor _photoAccessor;
        public DeleteSingleToolingCommandHandler(DataContext context, IPhotoAccessor photoAccessor)
        {
            _photoAccessor = photoAccessor;
            _context = context;

        }
        public async Task<bool> Handle(DeleteSingleToolingCommand request, CancellationToken cancellationToken)
        {
            var tooling = await _context.Toolings
                .Include(x => x.Images)
                .Include(x => x.Products)
                .FirstOrDefaultAsync(x => x.Id == request.Id);
            if (tooling is null)
                return false;
            await RemoveImages(tooling);
            RemoveProducts(tooling);
            _context.Remove(tooling);
            var result = await _context.SaveChangesAsync() > 0;
            return result;
        }

        private void RemoveProducts(Tooling tooling)
        {
            foreach (var product in tooling.Products)
            {
                _context.Products.Remove(product);
            }
        }

        private async Task RemoveImages(Tooling tooling)
        {
            foreach (var img in tooling.Images)
            {
                await _photoAccessor.DeletePhoto(img.Id);
                _context.Images.Remove(img);
            }
        }
    }
}