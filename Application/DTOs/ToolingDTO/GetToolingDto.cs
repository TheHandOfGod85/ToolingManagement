using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.DTOs.ImageDTO;
using Application.DTOs.ProductDTO;
using Domain;

namespace Application.DTOs.ToolingDTO
{
    public class GetToolingDto
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
        public string Image { get; set; }
        public ICollection<GetProductDto> Products { get; set; }
        public ICollection<ImageDto> Images { get; set; }
    }
}