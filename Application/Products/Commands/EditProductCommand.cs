using Application.Core;
using MediatR;

namespace Application.Products.Commands
{
    public class EditProductCommand : IRequest<ErrorResult<Unit>>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsAllergen { get; set; }
    }
}