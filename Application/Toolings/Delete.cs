using MediatR;
using Persistence;

namespace Application.Toolings
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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
                var tooling = await _context.Toolings.FindAsync(request.Id);
                _context.Remove(tooling);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }

}