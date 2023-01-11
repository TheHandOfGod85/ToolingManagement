using Application.Core;
using Application.DTOs.ToolingDTO;
using MediatR;

namespace Application.Toolings.Queries
{
    public class GetAllToolingsQuery : IRequest<ErrorResult<List<GetToolingDto>>>
    {

    }
}