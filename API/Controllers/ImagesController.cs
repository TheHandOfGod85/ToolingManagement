using Application.DTOs.ImageDTO;
using Application.Photos.Commands;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ImagesController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> Add([FromForm] AddImagesDto addImagesDto)
        {
            var command = Mapper.Map<AddImagesCommand>(addImagesDto);
            var result = await Mediator.Send(command);
            return HandleResult(result);
        }

        [HttpDelete("delete/{imgId}")]
        public async Task<IActionResult> Delete([FromRoute] string imgId)
        {
            var command = new DeleteImagesCommand(imgId);
            var result = await Mediator.Send(command);
            return HandleResult(result);
        }

        [HttpPut("setMain/{imgId}")]
        public async Task<IActionResult> SetMain([FromRoute] string imgId)
        {
            var command = new SetMainImageCommand(imgId);
            var result = await Mediator.Send(command);
            return HandleResult(result);
        }

        [HttpPut("unSetMain/{imgId}")]
        public async Task<IActionResult> UnSetMain([FromRoute] string imgId)
        {
            var command = new UnsetMainImageCommand(imgId);
            var result = await Mediator.Send(command);
            return HandleResult(result);
        }
    }
}
