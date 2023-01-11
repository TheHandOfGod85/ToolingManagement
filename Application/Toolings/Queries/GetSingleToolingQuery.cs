using Application.Core;
using Application.DTOs.ToolingDTO;
using MediatR;

namespace Application.Toolings.Queries
{
    public class GetSingleToolingQuery : IRequest<ErrorResult<GetToolingDto>>
    {
        public Guid Id { get; set; }
        public GetSingleToolingQuery(Guid id)
        {
            Id = id;
        }

    }
}