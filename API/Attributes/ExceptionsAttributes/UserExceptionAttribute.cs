using API.DTOs.Responses;
using Application.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Attributes.ExceptionsAttributes
{
    public class UserExceptionAttribute : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            if (context.Exception is not UserException) return;
            var response = new ErrorResponse
            {
                StatusCode = 400,
                TimeStamp = DateTime.Now,
                Title = "User error",
                Details = context.Exception.Message
            };

            context.Result = new BadRequestObjectResult(response);
        }
    }
}