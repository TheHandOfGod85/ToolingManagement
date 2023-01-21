using Application.Core;
using Application.DTOs.ImageDTO;
using MediatR;

namespace Application.Photos.Commands
{
    public class SetMainImageCommand : IRequest<ErrorResult<Unit>>
    {
        public SetMainImageCommand(string imageId)
        {
            ImageId = imageId;
        }
        public string ImageId { get; set; }

    }
}
