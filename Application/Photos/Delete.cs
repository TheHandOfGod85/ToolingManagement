using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Delete
    {
        public class Command : IRequest<ErrorResult<Unit>>
        {
            public string ImageId { get; set; }
        }

        public class Handler : IRequestHandler<Command, ErrorResult<Unit>>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _accessor;

            public Handler(DataContext context, IPhotoAccessor accessor)
            {
                _accessor = accessor;
                _context = context;
            }

            public async Task<ErrorResult<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {


                return ErrorResult<Unit>.Failure("Problem deleting images from API");
            }
        }
    }
}