using Application.DTOs.ProductDTO;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products
{
    public class ProductDetail
    {
        public class Query : IRequest<GetProductDto>
        { public int Id { get; set; } }

        public class Handler : IRequestHandler<Query, GetProductDto>
        {
            private readonly DataContext _dataContext;
            private readonly IMapper _mapper;

            public Handler(DataContext dataContext, IMapper mapper)
            {
                _dataContext = dataContext;
                _mapper = mapper;
            }

            public async Task<GetProductDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var product = await _dataContext.Products
                .ProjectTo<GetProductDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

                return product;
            }
        }
    }
}