using Application.Core;
using MediatR;

namespace Application.Photos.Commands
{
    public class UnsetMainImageCommand : IRequest<ErrorResult<Unit>>
    {
        public string ImageId { get; set; }
        public Guid ToolingId { get; set; }
    }
}