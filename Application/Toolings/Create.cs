using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Toolings
{
    public class Create
    {
        // a command following the  CQRS pattern allos to modify the database
        public class Command : IRequest
        {
            public Tooling Tooling { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Toolings.Add(request.Tooling);
                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}