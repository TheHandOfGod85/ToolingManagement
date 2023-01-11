using Application.Core;
using Application.DTOs.ToolingDTO;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Toolings.Queries
{
    public class GetSingleToolingQueryHandler : IRequestHandler<GetSingleToolingQuery, ErrorResult<GetToolingDto>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public GetSingleToolingQueryHandler(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }
        public async Task<ErrorResult<GetToolingDto>> Handle(GetSingleToolingQuery request, CancellationToken cancellationToken)
        {
            var tooling = await _context.Toolings
                .ProjectTo<GetToolingDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

            return ErrorResult<GetToolingDto>.Success(tooling);
        }
    }
}
