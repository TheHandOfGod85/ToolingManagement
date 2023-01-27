using Application.Core;
using AutoMapper;
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
        private IMapper _mapper;

        // getting the mediator from the hhtpcontext requesting the service
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices
        .GetService<IMediator>();
        protected IMapper Mapper => _mapper ??= HttpContext.RequestServices
      .GetService<IMapper>();
        // error handling for the controllers
        protected ActionResult HandleResult<T>(ErrorResult<T> result)
        {
            if (result == null) return NoContent();
            if (result.IsSuccess && result.Value != null)
                return Ok(result.Value);
            if (result.IsSuccess && result.Value == null)
                return NoContent();
            return BadRequest(result.Error);
        }

    }
}
