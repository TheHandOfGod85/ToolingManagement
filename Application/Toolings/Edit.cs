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
    public class Edit
    {
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
                var tooling = await _context.Toolings
                .Include(x => x.Product)
                .FirstOrDefaultAsync(x => x.Id == request.Tooling.Id);

                tooling.PSNumber = request.Tooling.PSNumber ?? tooling.PSNumber;
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}