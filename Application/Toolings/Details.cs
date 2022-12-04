using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Toolings
{
    public class Details
    {
        public class Query : IRequest<Tooling>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Tooling>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Tooling> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Toolings
                .Include(x => x.Product)
                .FirstOrDefaultAsync(x => x.Id == request.Id);
            }
        }
    }
}