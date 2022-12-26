namespace Domain
{
    public class Image
    {
        public string Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public Guid ToolingId { get; set; }
        public Tooling Tooling { get; set; }
    }
}