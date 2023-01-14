using FluentValidation;

namespace Application.Products.Validator
{
    public class ProductValidator : AbstractValidator<Product>
    {
        public ProductValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.IsAllergen).NotNull();
        }
    }
}