using Application.Core;
using MediatR;

namespace Application.Toolings.Commands
{
    public class DeleteSingleToolingCommand : IRequest<bool>
    {
        public Guid Id { get; }
        
    }
}