using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Toolings;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ToolingsController : BaseApiController
    {
        // get request that use mediator pattern to return a list of toolings
        [HttpGet]
        public async Task<ActionResult<List<Tooling>>> GetToolings()
        {
            return await Mediator.Send(new List.Query());

        }
        // return a single tooling using mediator 
        [HttpGet("{id}")]
        public async Task<ActionResult<Tooling>> GetTooling(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }
        // creating a tooling
        [HttpPost]
        public async Task<IActionResult> CreateTooling(Tooling tooling)
        {
            return Ok(await Mediator.Send(new Create.Command { Tooling = tooling }));
        }
        //updating toolings
        [HttpPut("{id}")]
        public async Task<IActionResult> EditTooling(Guid id, Tooling tooling)
        {
            tooling.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Tooling = tooling }));
        }
        //deleteing a tooling
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTooling(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}