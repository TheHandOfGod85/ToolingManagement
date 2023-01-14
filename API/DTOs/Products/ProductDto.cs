namespace Application.DTOs.ProductDTO
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsAllergen { get; set; }
        public Guid ToolingId { get; set; }

    }
}