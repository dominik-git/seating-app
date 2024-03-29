﻿using BookingApp.Common;
using BookingApp.Enums;
using log4net;
using Microsoft.AspNetCore.Mvc;

namespace BookingApp.Controllers
{

    public class BaseController : ControllerBase
    {
        private readonly ILog _logger;
        public BaseController()
        {
            _logger = LogManager.GetLogger(typeof(BaseController));
        }

        protected IActionResult ReturnResponse(dynamic model)
        {
            if (model.Status == RequestExecution.Successful || model.Status == RequestExecution.PartiallySuccessful)
            {
                return Ok(model);
            }

            return BadRequest(model);
        }

        protected IActionResult HandleError(Exception ex, string customErrorMessage = null)
        {
            _logger.Error(ex.Message, ex);

            BaseResponse<string> rsp = new BaseResponse<string>();
            rsp.Status = RequestExecution.Error;
#if DEBUG
            rsp.Errors = new List<string>() { $"Error: {(ex?.InnerException?.Message ?? ex.Message)} --> {ex?.StackTrace}" };
            return BadRequest(rsp);
#else
             rsp.Errors = new List<string>() { "An error occurred while processing your request!"};
             return BadRequest(rsp);
#endif
        }
    }
}
