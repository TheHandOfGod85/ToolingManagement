using API.DTOs.Toolings;
using API.Utilities;
using Application.DTOs.ToolingDTO;
using Application.Toolings.Commands;
using Application.Toolings.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    [Route("api/toolings")]
    [ApiController]
    public class ToolingsController : BaseApiController
    {
        // get request that use mediator pattern to return a list of toolings
        [HttpGet]
        public async Task<IActionResult> GetToolings()
        {
            var result = await Mediator.Send(new GetAllToolingsQuery());
            var mappedResult = Mapper.Map<List<GetToolingDto>>(result);
            return Ok(mappedResult);

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTooling(Guid id)
        {
            var result = await Mediator.Send(new GetToolingQuery(id));
            var mappedResult = Mapper.Map<GetToolingDto>(result);
            return Ok(mappedResult);
        }
        // creating a tooling
        [HttpPost]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> CreateTooling([FromBody] PutPostToolingDto toolingDto)
        {
            var command = Mapper.Map<CreateToolingCommand>(toolingDto);
            var result = await Mediator.Send(command);
            return Ok(result);
        }
        //updating toolings
        [HttpPut("{id}")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> EditTooling(Guid id, [FromBody] PutPostToolingDto toolingDto)
        {
            var command = Mapper.Map<UpdateToolingCommand>(toolingDto);
            command.Id = id;
            var result = await Mediator.Send(command);
            return HandleResult(result);
        }
        //deleting a tooling
        [HttpDelete("{id}")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> DeleteTooling([FromRoute] Guid id)
        {
            var result = await Mediator.Send(new DeleteSingleToolingCommand(id));
            return Ok(result);
        }
    }
}
