using Application.Core;
using MediatR;

namespace Application.Toolings.Commands
{
    public class DeleteSingleToolingCommand : IRequest<ErrorResult<Unit>>
    {
        public Guid Id { get; }
        public DeleteSingleToolingCommand(Guid id)
        {
            Id = id;
        }
    }
}