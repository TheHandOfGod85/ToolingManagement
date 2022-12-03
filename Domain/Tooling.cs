namespace Domain
{
    public class Tooling
    {
        public Guid Id { get; set; }
        public string TNumber { get; set; }
        public string PSNumber { get; set; }
        public int Quantity { get; set; }
        public string Department { get; set; }
        public string Note { get; set; }
        public bool IsInProduction { get; set; }
        public int NumberOfImpressions { get; set; }
        public string Image { get; set; }
        public string PunnetNumber { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}