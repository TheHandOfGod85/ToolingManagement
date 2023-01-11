using Application.DTOs.ProductDTO;
using FluentValidation;

namespace Application.Products.Validator
{
    public class ProductValidator : AbstractValidator<CreateProductDto>
    {
        public ProductValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.IsAllergen).NotNull();
        }
    }
}