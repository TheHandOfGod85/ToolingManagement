using API.Utilities;
using Application.DTOs.ToolingDTO;
using Application.Toolings;
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
            return HandleResult(await Mediator.Send(new GetAllToolingsQuery()));

        }
        // return a single tooling using mediator 
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTooling(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetSingleToolingQuery(id)));
        }
        // creating a tooling
        [HttpPost]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> CreateTooling([FromForm] ToolingDto toolingDto)
        {
            return HandleResult(await Mediator.Send(new CreateToolingCommand(toolingDto)));
        }
        //updating toolings
        [HttpPut("{id}")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> EditTooling(Guid id, ToolingDto toolingDto)
        {
            toolingDto.Id = id;
            return HandleResult(await Mediator.Send(new EditToolingCommand(toolingDto)));
        }
        //deleting a tooling
        [HttpDelete("{id}")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> DeleteTooling(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteSingleToolingCommand(id)));
        }
    }
}