using Application.Core;
using Application.DTOs.ToolingDTO;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

// here I am using the CQRS pattern using MEdiatR package

namespace Application.Toolings
{
    public class List
    {
        // this is the Query to request a list of toolings
        public class Query : IRequest<ErrorResult<List<GetToolingDto>>> { }

        // the handler using the request, in this case a query that return a list of toolings
        public class Handler : IRequestHandler<Query, ErrorResult<List<GetToolingDto>>>
        {
            // Inject the data context
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<ErrorResult<List<GetToolingDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                // return a list of toolings including the Product
                return ErrorResult<List<GetToolingDto>>.Success(await _context.Toolings
                .ProjectTo<GetToolingDto>(_mapper.ConfigurationProvider)
                .ToListAsync());
            }
        }
    }
}