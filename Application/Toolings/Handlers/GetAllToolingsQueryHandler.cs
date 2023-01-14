using Application.Core;
using Application.Toolings.Queries;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Toolings.Handlers
{
    // here I am using the CQRS pattern using MEdiatR package
    public class GetAllToolingsQueryHandler : IRequestHandler<GetAllToolingsQuery, List<Tooling>>
    {
        private readonly DataContext _context;
        public GetAllToolingsQueryHandler(DataContext context, IMapper mapper)
        {
            _context = context;

        }
        public async Task<List<Tooling>> Handle(GetAllToolingsQuery request, CancellationToken cancellationToken)
        {
            return await _context.Toolings
                .AsNoTracking()
                .Include(x => x.Products)
                        .ToListAsync();
        }
    }
}
