using Application.DTOs.ToolingDTO;
using FluentValidation;

namespace Application.Toolings.Validator
{
    public class ToolingValidator : AbstractValidator<ToolingDto>
    {
        public ToolingValidator()
        {
            RuleFor(x => x.PSNumber).NotEmpty();
            RuleFor(x => x.TNumber).NotEmpty();
        }
    }
}