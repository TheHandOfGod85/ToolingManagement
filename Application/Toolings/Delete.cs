using Application.Core;
using MediatR;
using Persistence;

namespace Application.Toolings
{
    public class Delete
    {
        public class Command : IRequest<ErrorResult<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, ErrorResult<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<ErrorResult<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var tooling = await _context.Toolings.FindAsync(request.Id);
                if (tooling == null) return null;
                _context.Remove(tooling);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return ErrorResult<Unit>.Failure("Failed to delete the tooling");
                return ErrorResult<Unit>.Success(Unit.Value);
            }
        }
    }

}