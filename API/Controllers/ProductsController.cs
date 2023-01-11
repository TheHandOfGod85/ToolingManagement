using Application.DTOs.ProductDTO;
using Application.Products.Commands;
using Application.Products.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    [ApiController]
    [Route("api/products/")]
    public class ProductsController : BaseApiController
    {
        [HttpGet("getProductsByToolingId/{toolingId}")]
        public async Task<IActionResult> GetProductsByToolingId([FromRoute] Guid toolingId)
        {
            var query = new GetProductsByToolingIdQuery(toolingId);
            var response = await Mediator.Send(query);
            return Ok(response);
        }
        [HttpPost("createProduct")]
        public async Task<IActionResult> CreateProduct([FromBody] CreateProductDto createProductDto)
        {
            return HandleResult(await Mediator.Send(new CreateProductCommand(createProductDto)));
        }

        [HttpDelete("deleteProductByToolingId")]
        public async Task<IActionResult> DeleteProduct(DeleteProductByToolingIdDto deleteProduct)
        {
            return HandleResult(await Mediator.Send(new DeleteProductByToolingIdCommand(deleteProduct)));
        }
    }
}