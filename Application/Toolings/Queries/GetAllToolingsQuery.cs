global using Domain;
using MediatR;

namespace Application.Toolings.Queries
{
    public class GetAllToolingsQuery : IRequest<List<Tooling>>
    {

    }
}
