namespace Application.DTOs.ProductDTO
{
    public class GetProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsAllergen { get; set; }
        public string ToolingId { get; set; }
    }
}