using Application.DTOs.ToolingDTO;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Toolings
{
    public class Details
    {
        public class Query : IRequest<GetToolingDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, GetToolingDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<GetToolingDto> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Toolings
                .ProjectTo<GetToolingDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);
            }
        }
    }
}