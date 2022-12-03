using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Toolings.Any()) return;

            var toolings = new List<Tooling>
            {
                new Tooling
                {
                    TNumber="T1335",
                    PSNumber="PS4355690",
                    Quantity=2,
                    Department="Stir fry",
                    IsInProduction=true,
                    NumberOfImpressions= 4,
                    PunnetNumber="PN332467",
                    Product = new Product
                    {
                        Name="Waitrose stir fry",
                        IsAllergen=true
                    }
                },
                new Tooling
                {
                    TNumber="T1891",
                    PSNumber="PS4377789",
                    Quantity=3,
                    Department="Salad",
                    IsInProduction=true,
                    NumberOfImpressions= 4,
                    PunnetNumber="PN33399980",
                    Product = new Product
                    {
                        Name="Tesco corn",
                        IsAllergen=false
                    }
                },
            };

            await context.Toolings.AddRangeAsync(toolings);
            await context.SaveChangesAsync();
        }
    }
}