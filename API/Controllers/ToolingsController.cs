using API.Utilities;
using Application.Toolings;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class ToolingsController : BaseApiController
    {
        // get request that use mediator pattern to return a list of toolings
        [HttpGet]
        public async Task<IActionResult> GetToolings()
        {
            return HandleResult(await Mediator.Send(new List.Query()));

        }
        // return a single tooling using mediator 
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTooling(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }
        // creating a tooling
        [HttpPost]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> CreateTooling(Tooling tooling)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Tooling = tooling }));
        }
        //updating toolings
        [HttpPut("{id}")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> EditTooling(Guid id, Tooling tooling)
        {
            tooling.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Tooling = tooling }));
        }
        //deleting a tooling
        [HttpDelete("{id}")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> DeleteTooling(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}