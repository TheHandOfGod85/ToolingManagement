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
    }
}