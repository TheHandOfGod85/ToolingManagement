using Application.Core;
using Application.Products.Commands;
using Application.Products.Validator;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Products.Handlers
{
    public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, ErrorResult<Unit>>
    {
        private readonly DataContext _context;

        public CreateProductCommandHandler(DataContext context)
        {
            _context = context;
        }

        public class CommandValidator : AbstractValidator<CreateProductCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.CreateProductDto).SetValidator(new ProductValidator());
            }
        }

        public async Task<ErrorResult<Unit>> Handle(CreateProductCommand request, CancellationToken cancellationToken)
        {
            var product = new Product
            {
                Id = request.CreateProductDto.Id,
                Name = request.CreateProductDto.Name,
                IsAllergen = request.CreateProductDto.IsAllergen,
                ToolingId = request.CreateProductDto.ToolingId
            };
            await _context.Products.AddAsync(product);
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return ErrorResult<Unit>.Failure("Failed to create a Product");
            return ErrorResult<Unit>.Success(Unit.Value);
        }
    }
}