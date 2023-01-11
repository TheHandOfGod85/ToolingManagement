using Application.Core;
using Application.DTOs.ToolingDTO;
using MediatR;

namespace Application.Toolings.Commands
{
    public class EditToolingCommand : IRequest<ErrorResult<Unit>>
    {
        public ToolingDto ToolingDto { get; }
        public EditToolingCommand(ToolingDto toolingDto)
        {
            ToolingDto = toolingDto;
        }
    }
}