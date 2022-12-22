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
        public string PunnetNumber { get; set; }
        public ICollection<Image> Images { get; set; } = new List<Image>();
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}