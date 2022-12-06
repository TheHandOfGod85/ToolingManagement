using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Application.DTOs.ProductDTO;

namespace Application.Products
{
    public class ListProduct
    {
        public class Query : IRequest<List<GetProductDto>>
        {

        }

        public class Handler : IRequestHandler<Query, List<GetProductDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<GetProductDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var products = await _context.Products
                .ProjectTo<GetProductDto>(_mapper.ConfigurationProvider)
                .ToListAsync();


                return products;
            }
        }
    }
}