using Application.Core;
using Domain;
using MediatR;

namespace Application.Toolings.Queries
{
    public class GetToolingQuery : IRequest<Tooling>
    {
        public Guid Id { get; set; }
        public GetToolingQuery(Guid id)
        {
            Id = id;
        }

    }
}
