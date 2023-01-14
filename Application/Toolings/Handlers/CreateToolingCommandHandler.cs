using Application.Toolings.Commands;
using MediatR;
using Persistence;


namespace Application.Toolings.Handlers
{
    public class CreateToolingCommandHandler : IRequestHandler<CreateToolingCommand, Tooling>
    {
        private readonly DataContext _context;
        public CreateToolingCommandHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Tooling> Handle(CreateToolingCommand request, CancellationToken cancellationToken)
        {
            var tooling = request.CreateTooling();
            _context.Toolings.Add(tooling);
            await _context.SaveChangesAsync();
            return tooling;
        }
    }
}
