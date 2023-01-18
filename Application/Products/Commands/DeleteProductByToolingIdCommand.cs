using MediatR;

namespace Application.Products.Commands
{
    public class DeleteProductByToolingIdCommand : IRequest<bool>
    {
        public DeleteProductByToolingIdCommand(int productid)
        {
            ProductId = productid;
        }
        public int ProductId { get; set; }
        //public Guid ToolingId { get; set; }
    }
}