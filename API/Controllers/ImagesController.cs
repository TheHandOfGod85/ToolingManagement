using Application.DTOs.ImageDTO;
using Application.Photos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ImagesController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> Add([FromForm] AddImagesDto addImagesDto)
        {
            return HandleResult(await Mediator.Send(new Add.Command { AddImagesDto = addImagesDto }));
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(DeleteImageDto deleteDto)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { DeleteImage = deleteDto }));
        }

        [HttpPost("setMain")]
        public async Task<IActionResult> SetMain(DeleteImageDto setMain)
        {
            return HandleResult(await Mediator.Send(new SetMain.Command { SetMain = setMain }));
        }
    }
}