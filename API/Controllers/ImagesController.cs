using Application.DTOs.ImageDTO;
using Application.Photos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ImagesController : BaseApiController
    {
        [HttpPost("{id}")]
        public async Task<IActionResult> Add(IFormFile file, Guid id)
        {
            return HandleResult(await Mediator.Send(new Add.Command { File = file, ToolingId = id }));
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(DeleteImageDto deleteDto)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { DeleteImage = deleteDto }));
        }
    }
}