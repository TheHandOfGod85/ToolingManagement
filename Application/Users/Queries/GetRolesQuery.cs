using MediatR;

namespace Application.Users.Queries
{
    public class GetRolesQuery : IRequest<List<string>>
    {

    }
}