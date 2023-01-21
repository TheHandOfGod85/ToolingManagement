using Application.Core;
using Application.DTOs.ImageDTO;
using MediatR;

namespace Application.Photos.Commands
{
    public class DeleteImagesCommand : IRequest<ErrorResult<Unit>>
    {
        public DeleteImagesCommand(string imageId)
        {
            ImageId = imageId;
        }
        public string ImageId { get; set; }


    }
}
