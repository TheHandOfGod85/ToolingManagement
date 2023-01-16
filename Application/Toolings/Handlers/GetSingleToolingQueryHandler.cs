using Application.Core;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Toolings.Queries
{
    public class GetSingleToolingQueryHandler : IRequestHandler<GetToolingQuery, Tooling>
    {
        private readonly DataContext _context;
        public GetSingleToolingQueryHandler(DataContext context)
        {
            _context = context;

        }
        public async Task<Tooling> Handle(GetToolingQuery request, CancellationToken cancellationToken)
        {
            var tooling = await _context.Toolings
                .AsNoTracking()
                .Include(x=>x.Images)
                .Include(y=>y.Products)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

            return tooling;
        }
    }
}
