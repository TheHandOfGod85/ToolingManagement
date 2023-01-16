namespace Application.DTOs.ImageDTO
{
    public class ImageDto
    {
        public string Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public Guid ToolingId { get; set; }
    }
}