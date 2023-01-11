using Application.Core;
using Application.DTOs.ImageDTO;
using MediatR;

namespace Application.Photos.Commands
{
    public class DeleteImagesCommand : IRequest<ErrorResult<Unit>>
    {
        public DeleteImageDto DeleteImage { get; set; }
        public DeleteImagesCommand(DeleteImageDto deleteImage)
        {
            DeleteImage = deleteImage;

        }

    }
}