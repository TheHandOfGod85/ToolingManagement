using Application.Core;
using Application.DTOs.ImageDTO;
using MediatR;

namespace Application.Photos.Commands
{
    public class AddImagesCommand : IRequest<ErrorResult<List<ImageDto>>>
    {
        public AddImagesDto AddImagesDto { set; get; }
        public AddImagesCommand(AddImagesDto addImagesDto)
        {
            AddImagesDto = addImagesDto;

        }

    }
}