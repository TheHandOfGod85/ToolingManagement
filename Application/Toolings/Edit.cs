using AutoMapper;
using Domain;
using MediatR;
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
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var tooling = await _context.Toolings.FindAsync(request.Tooling.Id);

                _mapper.Map(request.Tooling, tooling);

                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}