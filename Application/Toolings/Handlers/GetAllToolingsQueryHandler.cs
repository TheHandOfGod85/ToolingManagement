using Application.Toolings.Queries;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Toolings.Handlers
{
    // here I am using the CQRS pattern using MEdiatR package
    public class GetAllToolingsQueryHandler : IRequestHandler<GetAllToolingsQuery, List<Tooling>>
    {
        private readonly DataContext _context;
        public GetAllToolingsQueryHandler(DataContext context)
        {
            _context = context;

        }
        public async Task<List<Tooling>> Handle(GetAllToolingsQuery request, CancellationToken cancellationToken)
        {
            return await _context.Toolings
                .AsNoTracking()
                .Include(x => x.Products)
                .Include(x => x.Images)
                        .ToListAsync();
        }
    }
}
