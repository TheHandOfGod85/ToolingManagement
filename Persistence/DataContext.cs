using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Tooling> Toolings { get; set; }
        public DbSet<Product> Products { get; set; }



        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Product>()
            .HasOne<Tooling>(x => x.Tooling)
            .WithMany(g => g.Products);


            builder.Entity<Tooling>()
            .HasMany(c => c.Products)
            .WithOne(e => e.Tooling);
        }
    }
}