namespace Domain
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsAllergen { get; set; }
        public Tooling Tooling { get; set; }

    }
}