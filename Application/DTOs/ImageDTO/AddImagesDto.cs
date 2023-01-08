using Microsoft.AspNetCore.Http;

namespace Application.DTOs.ImageDTO
{
    public class AddImagesDto
    {
        public Guid ToolingId { get; set; }
        public IFormFile[] Files { get; set; }
    }
}