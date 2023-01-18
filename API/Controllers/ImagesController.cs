using Application.DTOs.ImageDTO;
using Application.DTOs.Images;
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

        [HttpDelete]
        public async Task<IActionResult> Delete(DeleteImageDto deleteDto)
        {
            var command = Mapper.Map<DeleteImagesCommand>(deleteDto);
            var result = await Mediator.Send(command);
            return HandleResult(result);
        }

        [HttpPost("setMain")]
        public async Task<IActionResult> SetMain(SetMainDto setMain)
        {
            var command = Mapper.Map<SetMainImageCommand>(setMain);
            var result = await Mediator.Send(command);
            return HandleResult(result);
        }

        [HttpPost("unsetMain")]
        public async Task<IActionResult> UnSetMain(SetMainDto setMain)
        {
            var command = Mapper.Map<UnsetMainImageCommand>(setMain);
            var result = await Mediator.Send(command);
            return HandleResult(result);
        }
    }
}
