using Application.Core;
using Application.DTOs.ImageDTO;
using MediatR;

namespace Application.Photos.Commands
{
    public class SetMainImageCommand : IRequest<ErrorResult<Unit>>
    {
        public DeleteImageDto SetMain { get; set; }
        public SetMainImageCommand(DeleteImageDto setMain)
        {
            SetMain = setMain;

        }

    }
}