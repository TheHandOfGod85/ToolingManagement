using Application.Core;
using Application.DTOs.ImageDTO;
using MediatR;

namespace Application.Photos.Commands
{
    public class DeleteImagesCommand : IRequest<ErrorResult<Unit>>
    {
        public string ImageId { get; set; }
        public Guid ToolingId { get; set; }

    }
}
