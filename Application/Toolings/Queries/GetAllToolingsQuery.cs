global using Domain;
using Application.Core;
using MediatR;

namespace Application.Toolings.Queries
{
    public class GetAllToolingsQuery : IRequest<List<Tooling>>
    {

    }
}
