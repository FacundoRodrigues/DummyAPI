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
        public async Task<Train> Get()
        {
            return await _trainService.Get();
        }

        [HttpPut("hook")]
        public async Task<Train> Hook([FromBody] CarriageRequest request)
        {
            return await _trainService.Hook(request.Value, request.Direction);
        }

        [HttpPut("unhook")]
        public async Task<Train> Unhook([FromBody] CarriageRequest request)
        {
            return await _trainService.Unhook(request.Direction);
        }
    }
}