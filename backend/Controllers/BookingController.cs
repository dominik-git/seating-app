using AutoMapper;
using BookingApp.Common;
using BookingApp.Controllers;
using BookingApp.Daos;
using BookingApp.Enums;
using BookingApp.Identity;
using BookingApp.Models;
using BookingApp.ViewModels;
using GoogleApi.Entities.Search.Video.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

[Route("api/[controller]")]
[Authorize]
[ApiController]
public class BookingController : BaseController
{
    private readonly IBookingRepository _repository;
    private readonly IMapper _mapper;
    private readonly UserManager<User> _userManager;
    public BookingController(IBookingRepository repository, IMapper mapper, UserManager<User> userManager)
    {
        _repository = repository;
        _mapper = mapper;
        _userManager = userManager;
    }

    // GET: api/Booking
    [HttpGet("GetAllBookingPlaces")]
    [ProducesResponseType(typeof(BaseResponse<IEnumerable<BookingPlaceViewModel>>), 200)]
    public async Task<IActionResult> GetAllBookingPlaces()
    {
        var bookingPlaceDaos = await _repository.GetBookingPlacesAsync();
        var result = await GetBookingPlaceViewModels(bookingPlaceDaos);
        return ReturnResponse(new BaseResponse<IEnumerable<BookingPlaceViewModel>>(result));
    }

    [HttpGet("GetAllByFloorAndDate")]
    [ProducesResponseType(typeof(BaseResponse<FloorViewModel>), 200)]
    public async Task<IActionResult> GetAllByFloorAndDate([FromQuery] int floorId, [FromQuery] DateTime? bookingDate)
    {
        var bookingPlaceDaos = await _repository.GetBookingPlacesWithBookingsByFloorIdAsync(floorId, bookingDate);

        var bookingPlacesVm = new List<BookingPlaceWithBookingsViewModel>();
        foreach (var item in bookingPlaceDaos)
        {
            bookingPlacesVm.Add(new BookingPlaceWithBookingsViewModel
            {
                Id = item.Id,
                Name = item.Name,
                Type = item.Type,
                ItemType = item.ItemType,
                AvailableForBooking = item.AvailableForBooking,
                FloorId = item.FloorId,
                Bookings = await GetBookingViewModels(item.Bookings),
                AvailableFrom = item.AvailableFrom,
                AvailableTo = item.AvailableTo,
                ReservedForUserId = item.ReservedForId,
            });
        }
        var result = new FloorViewModel
        {
            Id = floorId,
            BookingPlaces = bookingPlacesVm
        };
        return ReturnResponse(new BaseResponse<FloorViewModel>(result));
    }

    // GET: api/Booking/5
    [HttpGet("BookingPlace/{id}")]
    [ProducesResponseType(typeof(BaseResponse<BookingPlaceViewModel>), 200)]
    public async Task<IActionResult> GetBookingPlace(int id)
    {
        var bookingPlaceDao = await _repository.GetBookingPlaceAsync(id);

        if (bookingPlaceDao == null)
        {
            return NotFound();
        }

        var result = _mapper.Map<BookingPlaceViewModel>(bookingPlaceDao);
        result.ReservedForUserVm = result.ReservedForUserId != null ? await GetUserViewModel(result.ReservedForUserId.Value) : null;

        return ReturnResponse(new BaseResponse<BookingPlaceViewModel>(result));
    }

    [HttpGet("GetBookingById/{id}")]
    [ProducesResponseType(typeof(BaseResponse<BookingViewModel>), 200)]
    public async Task<IActionResult> GetBooking(int id)
    {
        var bookingDao = await _repository.GetBookingAsync(id);

        if (bookingDao == null)
        {
            return NotFound();
        }
        var result = _mapper.Map<BookingViewModel>(bookingDao);
        result.BookedByUserVm = await GetUserViewModel(result.BookedById.Value);
        return ReturnResponse(new BaseResponse<BookingViewModel>());
    }

    [HttpGet("GetByBookingPlaceIdWithDate/{id}")]
    [ProducesResponseType(typeof(BaseResponse<BookingPlaceWithBookingsViewModel>), 200)]
    public async Task<IActionResult> GetByBookingPlaceIdWithDate(int id)
    {
        var bookingDaos = await _repository.GetBookingByBookingPlaceIdWithDateAsync(id);
        var bookingPlace = await _repository.GetBookingPlaceAsync(id);
        var result = new BookingPlaceWithBookingsViewModel
        {
            Id = id,
            Name = bookingPlace.Name,
            Type = bookingPlace.Type,
            ItemType = bookingPlace.ItemType,
            AvailableForBooking = bookingPlace.AvailableForBooking,
            FloorId = bookingPlace.FloorId,
            ReservedForUserVm = bookingPlace.ReservedForId != null ? await GetUserViewModel(bookingPlace.ReservedForId.Value) : null,

            Bookings = await GetBookingViewModels(bookingDaos),
        };

        return ReturnResponse(new BaseResponse<BookingPlaceWithBookingsViewModel>(result));
    }

    // PUT: api/Booking/5
    [HttpPut("{id}")]
    [ProducesResponseType(typeof(BaseResponse<bool>), 200)]
    public async Task<IActionResult> Put(int id, BookingPlaceViewModel bookingPlaceViewModel)
    {
        if (id != bookingPlaceViewModel.Id)
        {
            return BadRequest();
        }

        var userEmail = this.User.FindFirstValue(ClaimTypes.Email) ?? "";
        var admin = this.User.FindFirstValue("admin") ?? "false";
        bool isAdmin = bool.Parse(admin);
        var user = await _userManager.FindByEmailAsync(userEmail);
        if (user == null)
        {
            return HandleError(new Exception("User not found"));
        }
        var bookingItem = await _repository.GetBookingPlaceAsync(id);
        if (bookingItem == null)
        {
            return HandleError(new Exception("Booking item not found"));
        }
        if (!isAdmin || user.Id != bookingItem.ReservedForId)
        {
            return HandleError(new Exception("You are not allowed to udate this entity"));
        }
        try
        {
            var bookingDao = _mapper.Map<BookingPlaceDao>(bookingPlaceViewModel);
            bookingDao.ModifiedDate = DateTime.UtcNow;
            await _repository.UpdateBookingPlaceAsync(bookingDao);
            return ReturnResponse(new BaseResponse<bool>(true));
        }
        catch (Exception ex)
        {
            return HandleError(ex);
        }
    }

    
    [HttpPut("CreateOrUpdateBookings")]
    [ProducesResponseType(typeof(BaseResponse<bool>), 200)]
    public async Task<IActionResult> CreateOrUpdateBookings(BookingsViewModel request)
    {
        var userEmail = this.User.Claims.FirstOrDefault(item => item.Type == "email")?.Value;
        bool isAdmin = string.IsNullOrEmpty(this.User.FindFirstValue("admin")) && bool.Parse(this.User.FindFirstValue("admin"));
        var user = await _userManager.FindByEmailAsync(userEmail);
        if (user == null)
        {
            return HandleError(new Exception("User not found"));
        }
        foreach (var bookingVm in request.Bookings)
        {
            var existingBooking = await _repository.GetBookingByIdAndBookingDateAsync(bookingVm.BookingId, bookingVm.BookingDate);
            var bookingRequest = new BookingModel
            {
                Id = bookingVm.BookingId,
                State = bookingVm.State,
                BookingDate = bookingVm.BookingDate.ToUniversalTime(),
                BookedBy = (int)user.Id,
                IsAdmin = isAdmin,
                BookingPlaceId = bookingVm.BookingPlaceId
            };
            if (existingBooking != null)
            {
                if (existingBooking.BookedById != user.Id)
                {
                    return HandleError(new Exception("Already reserved"));
                }
                try
                {
                    await _repository.UpdateStateAsync(bookingRequest);
                }
                catch (Exception ex)
                {
                    return HandleError(ex);
                }
            }
            else
            {
                var newBooking = new BookingDao
                {
                    BookingPlaceId = bookingVm.BookingPlaceId,
                    State = bookingVm.State,
                    CreatedDate = DateTime.UtcNow,
                    CreatedById = (int)user.Id,
                    BookingDate = bookingVm.BookingDate.ToUniversalTime(),
                    BookedById = (int)user.Id
                };
                try
                {
                    await _repository.CreateBookingAsync(newBooking);
                }
                catch (Exception ex)
                {
                    return HandleError(ex);
                }
            }
        }

        return ReturnResponse(new BaseResponse<bool>(true));
    }

    [HttpPut("CreateOrUpdate")]
    [ProducesResponseType(typeof(BaseResponse<bool>), 200)]
    public async Task<IActionResult> CreateOrUpdateBooking(BookingViewModel bookingVm)
    {
        var userEmail = this.User.FindFirstValue(ClaimTypes.Email) ?? "";
        var admin = this.User.FindFirstValue("admin") ?? "false";
        bool isAdmin = bool.Parse(admin);
        var user = await _userManager.FindByEmailAsync(userEmail);
        if (user == null)
        {
            return HandleError(new Exception("User not found"));
        }

        if (bookingVm.BookingDate < DateTime.UtcNow)
        {
            return HandleError(new Exception("Invalid booking date"));
        }

        var bookingPlace = await _repository.GetBookingPlaceAsync(bookingVm.BookingPlaceId);
        if (bookingPlace.Type == BookingPlaceTypeEnum.Fixed)
        {
            if (!bookingPlace.AvailableForBooking &&
            bookingPlace.ReservedForId.HasValue &&
            bookingPlace.ReservedForId != user.Id)
            {
                return HandleError(new Exception("Booking place reserved"));
            }

            if (bookingPlace.AvailableForBooking &&
                bookingVm.BookingDate < bookingPlace.AvailableFrom &&
                bookingVm.BookingDate > bookingPlace.AvailableTo)
            {
                return HandleError(new Exception("This booking place is reserved for day you choosed."));
            }
        }

        var existingBooking = await _repository.GetBookingByIdAndBookingDateAsync(bookingVm.BookingId, bookingVm.BookingDate);
        var bookingRequest = new BookingModel
        {
            Id = bookingVm.BookingId,
            State = bookingVm.State,
            BookingDate = bookingVm.BookingDate.ToUniversalTime(),
            BookedBy = (int)user.Id,
            IsAdmin = isAdmin,
            BookingPlaceId = bookingVm.BookingPlaceId
        };
        if (existingBooking != null)
        {
            if (existingBooking.BookedById != user.Id)
            {
                return HandleError(new Exception("Already reserved by another user"));
            }
            try
            {
                await _repository.UpdateStateAsync(bookingRequest);
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }
        else
        {
            var newBooking = new BookingDao
            {
                BookingPlaceId = bookingVm.BookingPlaceId,
                State = bookingVm.State,
                CreatedDate = DateTime.UtcNow,
                CreatedById = (int)user.Id,
                BookingDate = bookingVm.BookingDate.ToUniversalTime(),
                BookedById = (int)user.Id
            };
            try
            {
                await _repository.CreateBookingAsync(newBooking);
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }
        return ReturnResponse(new BaseResponse<bool>(true));
    }

    // PUT: api/Booking/ChangeState
    [HttpPut("ChangeTypes")]
    public async Task<IActionResult> ChangeTypes(MultipleBookingsTypeRequest request)
    {
        try
        {
            await _repository.UpdateTypeAsync(request.Ids, request.Type);
        }
        catch (Exception)
        {
            throw;
        }

        return Ok();
    }

    [Authorize(Policy = IdentityData.AdminUserPolicyName)]
    [HttpPut("ChangeType")]
    [ProducesResponseType(typeof(BaseResponse<bool>), 200)]
    public async Task<IActionResult> ChangeType(BookingTypeRequest request)
    {
        if (request.Type == BookingPlaceTypeEnum.Fixed && request.ReservedForId == null)
        {
            HandleError(new Exception("UserId is missing for Fixed type"));
        }
        try
        {
            await _repository.UpdateTypeAsync(request.Id, request.Type, request.ReservedForId);
        }
        catch (Exception ex)
        {
            HandleError(ex);
        }

        return ReturnResponse(new BaseResponse<bool>(true));
    }

    // POST: api/Booking
    [Authorize(Policy = IdentityData.AdminUserPolicyName)]
    [HttpPost]
    [ProducesResponseType(typeof(BaseResponse<BookingPlaceViewModel>), 200)]
    public async Task<IActionResult> Post(BookingPlaceViewModel bookingPlaceViewModel)
    {
        string userEmail = this.User.FindFirstValue(ClaimTypes.Email) ?? "";
        var user = await _userManager.FindByEmailAsync(userEmail);
        if (user == null)
        {
            return HandleError(new Exception("User not found"));
        }
        var bookingPlaceDao = _mapper.Map<BookingPlaceDao>(bookingPlaceViewModel);
        bookingPlaceDao.CreatedById = (int)user.Id;
        try
        {
            var createdDao = await _repository.CreateBookingPlaceAsync(bookingPlaceDao);
            if (createdDao != null)
            {
                await _repository.CreateBookingAsync(new BookingDao
                {
                    BookingPlaceId = createdDao.Id,
                    State = bookingPlaceViewModel.State,
                    CreatedDate = DateTime.UtcNow,
                    CreatedById = (int)user.Id,
                });
            }

            return ReturnResponse(new BaseResponse<BookingPlaceViewModel>(_mapper.Map<BookingPlaceViewModel>(createdDao)));
        }
        catch (Exception ex)
        {
            return HandleError(ex);
        }
    }

    // DELETE: api/Booking/5
    [Authorize(Policy = IdentityData.AdminUserPolicyName)]
    [HttpDelete("BookingPlace/{id}")]
    [ProducesResponseType(typeof(BaseResponse<bool>), 200)]
    public async Task<IActionResult> DeleteBookingPlace(int id)
    {
        var BookingPlaceViewModel = await _repository.GetBookingPlaceAsync(id);
        if (BookingPlaceViewModel == null)
        {
            HandleError(new Exception("Booking place not found"));
        }

        try
        {
            await _repository.DeleteBookingPlaceAsync(id);
            return ReturnResponse(new BaseResponse<bool>(true));
        }
        catch (Exception ex)
        {
            return HandleError(ex);
        }
    }

    [Authorize(Policy = IdentityData.AdminUserPolicyName)]
    [HttpDelete("{id}")]
    [ProducesResponseType(typeof(BaseResponse<bool>), 200)]
    public async Task<IActionResult> DeleteBooking(int id)
    {
        var BookingPlaceViewModel = await _repository.GetBookingAsync(id);
        if (BookingPlaceViewModel == null)
        {
            return HandleError(new Exception("Booking not found"));
        }

        try
        {
            await _repository.DeleteBookingAsync(id);
        }
        catch (Exception ex)
        {
            HandleError(ex);
        }
        return ReturnResponse(new BaseResponse<bool>(true));
    }

    [Authorize(Policy = IdentityData.AdminUserPolicyName)]
    [HttpGet("GetAllByFloorId/{floorId}")]
    [ProducesResponseType(typeof(BaseResponse<List<BookingPlaceWithBookingsViewModel>>), 200)]
    public async Task<IActionResult> GetAllByFloorId(int floorId)
    {
        var bookingPlaceList = await _repository.GetBookingPlacesWithBookingsByFloorIdAsync(floorId, null);
        if (bookingPlaceList == null)
        {
            return HandleError(new Exception("Booking not found"));
        }
        var result = new List<BookingPlaceWithBookingsViewModel>();

        foreach (var item in bookingPlaceList)
        {
            var bookingPlace = new BookingPlaceWithBookingsViewModel
            {
                Id = item.Id,
                Name = item.Name,
                Type = item.Type,
                ItemType = item.ItemType,
                AvailableForBooking = item.AvailableForBooking,
                FloorId = item.FloorId,
                Bookings = await GetBookingViewModels(item.Bookings),
                AvailableFrom = item.AvailableFrom,
                AvailableTo = item.AvailableTo,
                ReservedForUserId = item.ReservedForId,
            };
            if (item.ReservedForId != null)
            {
                bookingPlace.ReservedForUserVm = await GetUserViewModel(bookingPlace.ReservedForUserId.Value);
            }

            result.Add(bookingPlace);
        }

        return ReturnResponse(new BaseResponse<List<BookingPlaceWithBookingsViewModel>>(result));
    }
    [HttpGet("GetByBookingPlaceIdWithDateRange")]
    [ProducesResponseType(typeof(BaseResponse<BookingPlaceWithBookingsViewModel>), 200)]
    public async Task<IActionResult> GetByBookingPlaceIdWithDateRange([FromQuery] BookingRequestWithDateRange request)
    {
        var bookingPlace = await _repository.GetBookingPlaceAsync(request.BookingPlaceId);
        if (bookingPlace == null)
        {
            return HandleError(new Exception("Booking place not found"));
        }
        var bookingDaos = await _repository.GetBookingByBookingPlaceIdWithDateRangeAsync(request.BookingPlaceId, request.DateFrom, request.DateTo);
        
        var result = new BookingPlaceWithBookingsViewModel
        {
            Id = bookingPlace.Id,
            Name = bookingPlace.Name,
            Type = bookingPlace.Type,
            ItemType = bookingPlace.ItemType,
            AvailableForBooking = bookingPlace.AvailableForBooking,
            FloorId = bookingPlace.FloorId,
            ReservedForUserVm = bookingPlace.ReservedForId != null ? await GetUserViewModel(bookingPlace.ReservedForId.Value) : null,
            Bookings = await GetBookingViewModels(bookingDaos),
        };

        return ReturnResponse(new BaseResponse<BookingPlaceWithBookingsViewModel>(result));
    }

    private async Task<List<BookingViewModel>> GetBookingViewModels(ICollection<BookingDao> bookingDaos)
    {
        var bookingViewModels = new List<BookingViewModel>();
        foreach (var bookingDao in bookingDaos)
        {
            var bookingViewModel = await GetBookingViewModel(bookingDao);
            bookingViewModels.Add(bookingViewModel);
        }
        return bookingViewModels;
    }

    private async Task<BookingViewModel> GetBookingViewModel(BookingDao bookingDao)
    {
        return new BookingViewModel
        {
            BookingId = bookingDao.Id,
            BookingDate = bookingDao.BookingDate,
            BookingPlaceId = bookingDao.BookingPlaceId,
            State = bookingDao.State,
            BookedById = bookingDao.BookedById,
            BookedByUserVm = await GetUserViewModel(bookingDao.BookedById),
        };
    }

    private async Task<List<BookingPlaceViewModel>> GetBookingPlaceViewModels(IEnumerable<BookingPlaceDao> bookingPlaceDaos)
    {
        var bookingPlaceViewModels = new List<BookingPlaceViewModel>();
        foreach (var bookingPlaceDao in bookingPlaceDaos)
        {
            var bookingPlaceViewModel = await GetBookingPlaceViewModel(bookingPlaceDao);
            bookingPlaceViewModels.Add(bookingPlaceViewModel);
        }
        return bookingPlaceViewModels;
    }

    private async Task<BookingPlaceViewModel> GetBookingPlaceViewModel(BookingPlaceDao bookingPlaceDao)
    {
        return new BookingPlaceViewModel
        {
            Id = bookingPlaceDao.Id,
            Name = bookingPlaceDao.Name,
            Type = bookingPlaceDao.Type,
            ItemType = bookingPlaceDao.ItemType,
            AvailableForBooking = bookingPlaceDao.AvailableForBooking,
            AvailableFrom = bookingPlaceDao.AvailableFrom,
            AvailableTo = bookingPlaceDao.AvailableTo,
            FloorId = bookingPlaceDao.FloorId,
            ReservedForUserId = bookingPlaceDao.ReservedForId,
            ReservedForUserVm = bookingPlaceDao.ReservedForId != null ? await GetUserViewModel(bookingPlaceDao.ReservedForId.Value) : null,
        };
    }

    private async Task<UserViewModel> GetUserViewModel(int userId)
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());
        return _mapper.Map<UserViewModel>(user);
    }
}
