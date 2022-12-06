using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.Toolings.Validator
{
    public class ToolingValidator : AbstractValidator<Tooling>
    {
        public ToolingValidator()
        {
            RuleFor(x => x.PSNumber).NotEmpty();
            RuleFor(x => x.TNumber).NotEmpty();
        }
    }
}