using Domain;
using FluentValidation;

namespace Application.Toolings.Validator
{
    public class ProductValidator : AbstractValidator<Product>
    {
        public ProductValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
        }
    }
}