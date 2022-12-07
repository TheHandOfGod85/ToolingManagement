using Application.DTOs.ProductDTO;
using Application.Products;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            return HandleResult(await Mediator.Send(new ListProduct.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            return HandleResult(await Mediator.Send(new ProductDetail.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct(Product product)
        {
            return HandleResult(await Mediator.Send(new CreateProduct.Command { Product = product }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditProduct(int id, Product product)
        {
            return HandleResult(await Mediator.Send(new EditProduct.Command { Product = product }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            return HandleResult(await Mediator.Send(new DeleteProduct.Command { Id = id }));
        }
    }
}