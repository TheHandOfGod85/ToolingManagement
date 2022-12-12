using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser{DisplayName = "Dan",UserName = "dan",Email="dan@test.com"},
                    new AppUser{DisplayName = "Tom",UserName = "tom",Email="tom@test.com"},
                    new AppUser{DisplayName = "Jan",UserName = "jan",Email="jan@test.com"}
                };
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$0rd");
                }
            }

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
                    Products = new Product[]
                    {
                        new Product{
                            Name="The sublime salad",
                            IsAllergen = false,
                        }
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
                    Products = new Product[]
                    {
                        new Product{
                            Name="Melon and grape",
                            IsAllergen = false,
                        },
                        new Product{
                            Name="Banana sunrise",
                            IsAllergen = false,
                        },
                    }
                },
            };

            await context.Toolings.AddRangeAsync(toolings);
            await context.SaveChangesAsync();
        }
    }
}