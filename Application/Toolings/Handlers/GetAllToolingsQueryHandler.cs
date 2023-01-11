using Application.Core;
using Application.DTOs.ToolingDTO;
using Application.Toolings.Queries;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Toolings.Handlers
{
    // here I am using the CQRS pattern using MEdiatR package
    public class GetAllToolingsQueryHandler : IRequestHandler<GetAllToolingsQuery, ErrorResult<List<GetToolingDto>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public GetAllToolingsQueryHandler(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }
        public async Task<ErrorResult<List<GetToolingDto>>> Handle(GetAllToolingsQuery request, CancellationToken cancellationToken)
        {
            // return a list of toolings including the Product
            return ErrorResult<List<GetToolingDto>>.Success(await _context.Toolings
            .ProjectTo<GetToolingDto>(_mapper.ConfigurationProvider)
            .ToListAsync());
        }
    }
}