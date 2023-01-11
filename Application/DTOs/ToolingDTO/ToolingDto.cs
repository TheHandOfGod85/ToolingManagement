using Application.DTOs.ProductDTO;
using Microsoft.AspNetCore.Http;

namespace Application.DTOs.ToolingDTO
{
    public class ToolingDto
    {
        public Guid Id { get; set; }
        public string TNumber { get; set; }
        public string PSNumber { get; set; }
        public int Quantity { get; set; }
        public string Department { get; set; }
        public string Note { get; set; }
        public bool IsInProduction { get; set; }
        public int NumberOfImpressions { get; set; }
        public string PunnetNumber { get; set; }
        public ICollection<ProductDto> Products { get; set; } = new List<ProductDto>();
        public IFormFile[] Files { get; set; }

    }
}