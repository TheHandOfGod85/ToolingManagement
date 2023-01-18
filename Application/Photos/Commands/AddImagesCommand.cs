using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Photos.Commands
{
    public class AddImagesCommand : IRequest<ErrorResult<List<Image>>>
    {
        public Guid ToolingId { get; set; }
        public IFormFile[] Files { get; set; }

    }
}
