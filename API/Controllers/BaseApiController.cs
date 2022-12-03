using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    public class BaseApiController : ControllerBase
    {
        // injecting the Mediator in the base controller so other controller wiil reuse it
        private IMediator _mediator;

        // getting the mediator from the hhtpcontext requesting the service
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices
        .GetService<IMediator>();

    }
}