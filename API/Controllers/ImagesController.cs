using Application.DTOs.ImageDTO;
using Application.Photos;
using Application.Photos.Commands;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ImagesController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> Add([FromForm] AddImagesDto addImagesDto)
        {
            return HandleResult(await Mediator.Send(new AddImagesCommand(addImagesDto)));
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(DeleteImageDto deleteDto)
        {
            return HandleResult(await Mediator.Send(new DeleteImagesCommand(deleteDto)));
        }

        [HttpPost("setMain")]
        public async Task<IActionResult> SetMain(DeleteImageDto setMain)
        {
            return HandleResult(await Mediator.Send(new SetMainImageCommand(setMain)));
        }
    }
}