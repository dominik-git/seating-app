using AutoMapper;
using BookingApp.Daos;
using BookingApp.Identity;
using BookingApp.Interfaces;
using BookingApp.Models;
using BookingApp.ViewModels;
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
        private readonly IBookingRepository _bookingRepository;
        private readonly IMapper _mapper;
        public FloorController(IFloorRepository repository, IMapper mapper, IBookingRepository bookingRepository)
        {
            _repository = repository;
            _mapper = mapper;
            _bookingRepository = bookingRepository;
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

        [HttpGet("GetAll")]
        public async Task<ActionResult<List<FloorSimpleViewModel>>> GetAll()
        {
            var floors = await _repository.GetAllAsync();
            if (floors == null || !floors.Any())
            {
                return NotFound();
            }

            return _mapper.Map<List<FloorSimpleViewModel>>(floors);
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
        [HttpPost("CreateWithBookingPlaces")]
        public async Task<ActionResult<FloorViewModel>> CreateWithBookingPlaces(CreateFloorWithBookingPlacesRequest request)
        {
            try
            {
                var floorDao = new FloorDao
                {
                    Name = request.Name,
                    Description = request.Description,
                    Svg = request.Svg
                };
                var createdFloor = await _repository.CreateAsync(floorDao);
                var createdBookingPlaces = new List<BookingPlaceDao>();
                foreach (var bookingPlace in request.BookingPlaces)
                {
                    bookingPlace.FloorId = createdFloor.Id;
                    createdBookingPlaces.Add(await _bookingRepository.CreateBookingPlaceAsync(_mapper.Map<BookingPlaceDao>(bookingPlace)));
                }
                var result = new FloorViewModel
                {
                    FloorId = createdFloor.Id,
                    FloorName = createdFloor.Name,
                    FloorDescription = createdFloor.Description,
                    Svg = createdFloor.Svg,
                    BookingPlaces = createdBookingPlaces.Select(item => _mapper.Map<BookingPlaceWithBookingsViewModel>(item)).ToList()
                };
                return _mapper.Map<FloorViewModel>(createdFloor);
            }
            catch (Exception)
            {
                throw;
            }            
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
        [Authorize(Policy = IdentityData.AdminUserPolicyName)]
        [HttpDelete]
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
