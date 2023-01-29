namespace API.DTOs.Responses
{
    public class ErrorResponse
    {
        public int StatusCode { get; set; }
        public DateTime TimeStamp { get; set; }
        public string Title { get; set; }
        public string Details { get; set; }
    }
}