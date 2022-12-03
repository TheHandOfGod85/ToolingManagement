using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

// here I am using the CQRS pattern using MEdiatR package

namespace Application.Toolings
{
    public class List
    {
        // this is the Query to request a list of toolings
        public class Query : IRequest<List<Tooling>> { }

        // the handler using the request, in this case a query that return a list of toolings
        public class Handler : IRequestHandler<Query, List<Tooling>>
        {
            // Inject the data context
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Tooling>> Handle(Query request, CancellationToken cancellationToken)
            {
                // return a list of toolings including the Product
                return await _context.Toolings
                .Include(x => x.Product)
                .ToListAsync();
            }
        }
    }
}