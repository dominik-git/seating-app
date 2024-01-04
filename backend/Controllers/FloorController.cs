using AutoMapper;
using BookingApp.Common;
using BookingApp.Daos;
using BookingApp.Identity;
using BookingApp.Interfaces;
using BookingApp.Models;
using BookingApp.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookingApp.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class FloorController : BaseController
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
        [ProducesResponseType(typeof(BaseResponse<FloorSimpleViewModel>), 200)]
        public async Task<IActionResult> Get(int id)
        {
            var floor = await _repository.GetAsync(id);
            if (floor == null)
            {
                return NotFound();
            }

            return ReturnResponse(new BaseResponse<FloorSimpleViewModel>(_mapper.Map<FloorSimpleViewModel>(floor)));
        }

        [HttpGet("GetAll")]
        [ProducesResponseType(typeof(BaseResponse<List<FloorSimpleViewModel>>), 200)]
        public async Task<IActionResult> GetAll()
        {
            var floors = await _repository.GetAllAsync();
            if (floors == null || !floors.Any())
            {
                return NotFound();
            }

            return ReturnResponse(new BaseResponse<List<FloorSimpleViewModel>>(_mapper.Map<List<FloorSimpleViewModel>>(floors)));
        }

        [Authorize(Policy = IdentityData.AdminUserPolicyName)]
        [HttpPost]
        [ProducesResponseType(typeof(BaseResponse<FloorSimpleViewModel>), 200)]
        public async Task<IActionResult> Create(FloorSimpleViewModel floor)
        {
            var floorDao = _mapper.Map<FloorDao>(floor);
            try
            {
                var createdFloor = await _repository.CreateAsync(floorDao);
                return ReturnResponse(new BaseResponse<FloorSimpleViewModel>(_mapper.Map<FloorSimpleViewModel>(createdFloor)));
            }
            catch (Exception ex)
            {

                return HandleError(ex);
            }
        }

        [Authorize(Policy = IdentityData.AdminUserPolicyName)]
        [HttpPost("CreateWithBookingPlaces")]
        [ProducesResponseType(typeof(BaseResponse<FloorViewModel>), 200)]
        public async Task<IActionResult> CreateWithBookingPlaces(CreateFloorWithBookingPlacesRequest request)
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
                    Id = createdFloor.Id,
                    Name = createdFloor.Name,
                    Description = createdFloor.Description,
                    Svg = createdFloor.Svg,
                    BookingPlaces = createdBookingPlaces.Select(item => _mapper.Map<BookingPlaceWithBookingsViewModel>(item)).ToList()
                };

                return ReturnResponse(new BaseResponse<FloorViewModel>(result));

            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [Authorize(Policy = IdentityData.AdminUserPolicyName)]
        [HttpPut]
        public async Task<ActionResult<FloorSimpleViewModel>> Update(FloorSimpleViewModel floor)
        {
            var floorDao = await _repository.GetAsync(floor.Id);
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
