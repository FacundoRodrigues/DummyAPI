using Azure.Core;
using Exam.Domain;
using Exam.Dto;
using Exam.Services;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainController : ControllerBase
    {
        private readonly ITrainService _trainService;

        public TrainController(ITrainService trainService)
        {
            _trainService = trainService;
        }

        [HttpGet]
        public Train Get()
        {
            return _trainService.Get();
        }

        [HttpPut("hook")]
        public Train Hook([FromBody] CarriageRequest request)
        {
            return _trainService.Hook(request.Value, request.Direction);
        }

        [HttpPut("unhook")]
        public Train Unhook([FromBody] CarriageRequest request)
        {
            return _trainService.Unhook(request.Direction);
        }
    }
}