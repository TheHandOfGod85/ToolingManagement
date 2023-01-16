using Application.Core;
using MediatR;

namespace Application.Toolings.Commands
{
    public class DeleteSingleToolingCommand : IRequest<bool>
    {
        public DeleteSingleToolingCommand(Guid id)
        {
            Id= id;
        }
        public Guid Id { get; }
        
    }
}
