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
            var result = await Mediator.Send(new GetProductsByToolingIdQuery(toolingId));
            var mappedResult = Mapper.Map<List<ProductDto>>(result);
            return Ok(mappedResult);
        }
        [HttpPost("createProduct")]
        public async Task<IActionResult> CreateProduct([FromBody] CreateProductDto createProductDto)
        {
            var command = Mapper.Map<CreateProductCommand>(createProductDto);
            var result = await Mediator.Send(command);
            return Ok(result);
        }

        [HttpDelete("deleteProductByToolingId/{productId}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] int productId)
        {
            var command = new DeleteProductByToolingIdCommand(productId);
            var result = await Mediator.Send(command);
            return result ? NoContent() : NotFound();
        }
    }
}