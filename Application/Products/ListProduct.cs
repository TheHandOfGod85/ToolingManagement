using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Application.DTOs.ProductDTO;
using Application.Core;

namespace Application.Products
{
    public class ListProduct
    {
        public class Query : IRequest<ErrorResult<List<GetProductDto>>>
        {

        }

        public class Handler : IRequestHandler<Query, ErrorResult<List<GetProductDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<ErrorResult<List<GetProductDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return ErrorResult<List<GetProductDto>>.Success(await _context.Products
                   .ProjectTo<GetProductDto>(_mapper.ConfigurationProvider)
                   .ToListAsync());



            }
        }
    }
}