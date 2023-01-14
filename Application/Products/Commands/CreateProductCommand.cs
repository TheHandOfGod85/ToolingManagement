using Domain;
using MediatR;

namespace Application.Products.Commands
{
    public class CreateProductCommand : IRequest<Product>
    {
        public string Name { get; set; }
        public bool IsAllergen { get; set; }
        public Guid ToolingId { get; set; }


        internal Product CreateProduct()
        {
            return new Product
            {
                Name = Name,
                IsAllergen = IsAllergen,
                ToolingId = ToolingId
            };
        }
    }


}