using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Tooling> Toolings { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Image> Images { get; set; }



        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Product>()
            .HasOne<Tooling>(x => x.Tooling)
            .WithMany(g => g.Products);


            builder.Entity<Tooling>()
            .HasMany(c => c.Products)
            .WithOne(e => e.Tooling);

            // builder.Entity<Tooling>().Property(x => x.Id).HasDefaultValueSql("NEWID()");
        }
    }
}