using Application.Core;
using Application.DTOs.ToolingDTO;
using MediatR;

namespace Application.Toolings.Commands
{

    // a command following the  CQRS pattern allos to modify the database
    public class CreateToolingCommand : IRequest<ErrorResult<Unit>>
    {
        public ToolingDto ToolingDto { set; get; }
        public CreateToolingCommand(ToolingDto toolingDto)
        {
            ToolingDto = toolingDto;
        }

    }

}