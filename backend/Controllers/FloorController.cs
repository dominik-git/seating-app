using AutoMapper;
using BookingApp.Daos;
using BookingApp.Identity;
using BookingApp.Models;
using BookingApp.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Drawing;

namespace BookingApp.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class FloorController : ControllerBase
    {
        private readonly IFloorRepository _repository;
        private readonly IMapper _mapper;
        public FloorController(IFloorRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<FloorSimpleViewModel>> Get(int id)
        {
            var floor = await _repository.GetAsync(id);
            if (floor == null)
            {
                return NotFound();
            }

            return _mapper.Map<FloorSimpleViewModel>(floor);
        }

        [Authorize(Policy = IdentityData.AdminUserPolicyName)]
        [HttpPost]
        public async Task<ActionResult<FloorSimpleViewModel>> Create(FloorSimpleViewModel floor)
        {
            var floorDao = _mapper.Map<FloorDao>(floor);
            var createdFloor = await _repository.CreateAsync(floorDao);
            return _mapper.Map<FloorSimpleViewModel>(createdFloor);
        }

        [Authorize(Policy = IdentityData.AdminUserPolicyName)]
        [HttpPut]
        public async Task<ActionResult<FloorSimpleViewModel>> Update(FloorSimpleViewModel floor)
        {
            var floorDao = await _repository.GetAsync(floor.FloorId);
            if (floorDao == null)
            {
                return NotFound();
            }
            var updated = await _repository.UpdateAsync(_mapper.Map<FloorDao>(floor));
            return _mapper.Map<FloorSimpleViewModel>(updated);
        }
        
        public async Task<ActionResult> Delete(int id)
        {
            var floorDao = await _repository.GetAsync(id);
            if (floorDao == null)
            {
                return NotFound();
            }
            await _repository.DeleteAsync(id);
            return Ok();
        }
    }
}
