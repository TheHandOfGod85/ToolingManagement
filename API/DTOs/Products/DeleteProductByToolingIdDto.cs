namespace Application.DTOs.ProductDTO
{
    public class DeleteProductByToolingIdDto
    {
        public int ProductId { get; set; }
        public Guid ToolingId { get; set; }
    }
}