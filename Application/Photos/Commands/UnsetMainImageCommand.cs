using Application.Core;
using MediatR;

namespace Application.Photos.Commands
{
    public class UnsetMainImageCommand : IRequest<ErrorResult<Unit>>
    {
        public UnsetMainImageCommand(string imageId)
        {
            ImageId = imageId;
        }
        public string ImageId { get; set; }
    }
}