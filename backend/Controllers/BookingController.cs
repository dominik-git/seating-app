using AutoMapper;
using BookingApp.Common;
using BookingApp.Controllers;
using BookingApp.Daos;
using BookingApp.Enums;
using BookingApp.Identity;
using BookingApp.Interfaces;
using BookingApp.Models;
using BookingApp.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[Authorize]
[ApiController]
public class BookingController : BaseController
{
    private readonly IBookingRepository _repository;
    private readonly IMapper _mapper;
    private readonly UserManager<User> _userManager;
    private readonly IAuthService _authService;
    public BookingController(
        IBookingRepository repository,
        IMapper mapper,
        UserManager<User> userManager,
        IAuthService authService)
    {
        _repository = repository;
        _mapper = mapper;
        _userManager = userManager;
        _authService = authService;
    }

    // GET: api/Booking
    [HttpGet("GetAllBookingPlaces")]
    [ProducesResponseType(typeof(BaseResponse<IEnumerable<BookingPlaceViewModel>>), 200)]
    public async Task<IActionResult> GetAllBookingPlaces()
    {
        var bookingPlaceDaos = await _repository.GetBookingPlacesAsync();
        var result = await GetBookingPlaceViewModels(bookingPlaceDaos, null);
        return ReturnResponse(new BaseResponse<IEnumerable<BookingPlaceWithBookingsViewModel>>(result));
    }

    [HttpGet("GetAllByUserId")]
    [ProducesResponseType(typeof(BaseResponse<UserBookingsViewModel>), 200)]
    public async Task<IActionResult> GetAllByUserId([FromQuery] int month)
    {
        if (month == default)
        {
            month = DateTime.UtcNow.Month;
        }
        if (month > 12)
        {
            return HandleError(new Exception("Wrong month"));
        }

        var user = await _authService.GetCurrentUser(User);
        var bookingDaos = await _repository.GetAllByUserId(Convert.ToInt16(user.Id), month);
        var fixedPlaces = await _repository.GetAllFixedByUserId(Convert.ToInt16(user.Id));
        var result = new UserBookingsViewModel
        {
            BookingsVm = new List<UserBookingViewModel>(),
            ParkingsVm = new List<UserBookingViewModel>(),
            FixedPlacesVm = await GetBookingPlaceViewModels(fixedPlaces, BookingPlaceItemTypeEnum.SeatingSlot),
            FixedParkingsVm = await GetBookingPlaceViewModels(fixedPlaces, BookingPlaceItemTypeEnum.ParkingSlot),
            BookedByUserVm = _mapper.Map<UserViewModel>(user),
        };
        foreach (var item in bookingDaos)
        {
            if (item.BookingPlace.ItemType == BookingPlaceItemTypeEnum.SeatingSlot)
            {
                result.BookingsVm.Add(new UserBookingViewModel
                {
                    BookingId = item.Id,
                    BookingDate = item.BookingDate,
                    BookingPlaceId = item.BookingPlaceId,
                    State = item.State,
                    BookedById = item.BookedById,
                    BookingPlaceVm = await GetBookingPlaceViewModel(item.BookingPlace),
                });
            }

            if (item.BookingPlace.ItemType == BookingPlaceItemTypeEnum.ParkingSlot)
            {
                result.ParkingsVm.Add(new UserBookingViewModel
                {
                    BookingId = item.Id,
                    BookingDate = item.BookingDate,
                    BookingPlaceId = item.BookingPlaceId,
                    State = item.State,
                    BookedById = item.BookedById,
                    BookingPlaceVm = await GetBookingPlaceViewModel(item.BookingPlace),
                });
            }
        }
        return ReturnResponse(new BaseResponse<UserBookingsViewModel>(result, bookingDaos.Count));
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
                FloorId = item.FloorId,
                Bookings = await GetBookingViewModels(item.Bookings),
                ReservedForUserId = item.ReservedForId,
                ReservedForUserVm = item.ReservedForId != null ? await GetUserViewModel(item.ReservedForId.Value) : null,
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
        var bookingDaos = await _repository.GetBookingByBookingPlaceIdWithDateAsync(id, DateTime.UtcNow);
        var bookingPlace = await _repository.GetBookingPlaceAsync(id);
        var result = new BookingPlaceWithBookingsViewModel
        {
            Id = id,
            Name = bookingPlace.Name,
            Type = bookingPlace.Type,
            ItemType = bookingPlace.ItemType,
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

        var user = await _authService.GetCurrentUser(User);
        var bookingItem = await _repository.GetBookingPlaceAsync(id);
        if (bookingItem == null)
        {
            return HandleError(new Exception("Booking item not found"));
        }
        if (!user.IsAdmin || user.Id != bookingItem.ReservedForId)
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
        var errors = new List<string>();
        var user = await _authService.GetCurrentUser(User);
        foreach (var bookingVm in request.Bookings)
        {
            if (bookingVm.BookingDate < DateTime.Today.Date.ToUniversalTime())
            {
                errors.Add($"Invalid booking date, requested date: {bookingVm.BookingDate}");
                continue;
            }

            var bookingPlace = await _repository.GetBookingPlaceAsync(bookingVm.BookingPlaceId);           
            if (bookingPlace.Type == BookingPlaceTypeEnum.Fixed)
            {
                if (bookingPlace.ReservedForId.HasValue &&
                bookingPlace.ReservedForId != user.Id)
                {
                    errors.Add($"Booking place reserved ref: {bookingVm.BookingDate}");
                    continue;
                }

                var bookings = await _repository.GetBookingByBookingPlaceIdWithDateAsync(bookingVm.BookingPlaceId, bookingVm.BookingDate);
                if (bookings == null || bookings.FirstOrDefault(x => x.State != BookingStateEnum.Available) != null)
                {
                    errors.Add($"This booking place is reserved for day you choosed. ref: {bookingVm.BookingDate}");
                    continue;
                }
            }
            var existingBooking = await _repository.GetBookingByIdAndBookingDateAsync(bookingVm.BookingId, bookingVm.BookingDate);
            var bookingRequest = new BookingModel
            {
                Id = bookingVm.BookingId,
                State = bookingVm.State,
                BookingDate = bookingVm.BookingDate.ToUniversalTime(),
                BookedBy = (int)user.Id,
                IsAdmin = user.IsAdmin,
                BookingPlaceId = bookingVm.BookingPlaceId
            };
            if (existingBooking != null)
            {
                if (existingBooking.BookedById != user.Id)
                {
                    errors.Add($"Already reserved for another user ref. date: {bookingVm.BookingDate}");
                }
                try
                {
                    await _repository.UpdateStateAsync(bookingRequest);
                }
                catch (Exception ex)
                {
                    errors.Add(ex.Message);
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
                    errors.Add(ex.Message);
                }
            }
        }
        if (errors.Count > 0)
        {
            return ReturnResponse(new BaseResponse<string>("Partially successful", "One or more errors occured", errors, RequestExecution.PartiallySuccessful));
        }

        if (errors.Count > 0 && errors.Count == request.Bookings.Count)
        {
            HandleError(new Exception(string.Join('*', errors)));
        }

        return ReturnResponse(new BaseResponse<bool>(true, request.Bookings.Count));
    }

    [HttpPut("CreateOrUpdate")]
    [ProducesResponseType(typeof(BaseResponse<bool>), 200)]
    public async Task<IActionResult> CreateOrUpdateBooking(BookingViewModel bookingVm)
    {
        var user = await _authService.GetCurrentUser(User);
        if (bookingVm.BookingDate < DateTime.UtcNow)
        {
            return HandleError(new Exception("Invalid booking date"));
        }

        var bookingPlace = await _repository.GetBookingPlaceAsync(bookingVm.BookingPlaceId);
        if (bookingPlace.Type == BookingPlaceTypeEnum.Fixed)
        {
            if (bookingPlace.ReservedForId.HasValue &&
            bookingPlace.ReservedForId != user.Id)
            {
                return HandleError(new Exception("Booking place reserved"));
            }

            var bookings = await _repository.GetBookingByBookingPlaceIdWithDateAsync(bookingVm.BookingPlaceId, bookingVm.BookingDate);
            if (bookings == null || bookings.First(x => x.State != BookingStateEnum.Available) != null)
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
            IsAdmin = user.IsAdmin,
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

    [HttpPut("ReleaseFixedPlace")]
    [ProducesResponseType(typeof(BaseResponse<bool>), 200)]
    public async Task<IActionResult> ReleaseFixedPlace(BookingReleasePlaceRequest request)
    {
        var bookingPlace = await _repository.GetBookingPlaceAsync(request.BookingPlaceId);
        if (bookingPlace == default)
        {
            HandleError(new Exception("Booking place not found"));
        }

        if (request.ReleaseDates == null || request.ReleaseDates.Count == 0)
        {
            HandleError(new Exception("Release dates are missing"));
        }

        if (bookingPlace.Type != BookingPlaceTypeEnum.Fixed)
        {
            HandleError(new Exception("Booking place type is not fixed"));
        }
        var user = await _authService.GetCurrentUser(User);

        if (user.Id != bookingPlace.ReservedForId || !user.IsAdmin)
        {
            return HandleError(new Exception("You are not allowed to release this place!"));
        }

        try
        {
            foreach (var item in request.ReleaseDates)
            {
                var booking = new BookingDao
                {
                    BookingPlaceId = bookingPlace.Id,
                    BookedById = (int)user.Id,
                    CreatedById = (int)user.Id,
                    BookingDate = item.ToUniversalTime(),
                    CreatedDate = DateTime.UtcNow,
                    State = BookingStateEnum.Available,
                };
                await _repository.CreateBookingAsync(booking);
            }
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
        var user = await _authService.GetCurrentUser(User);
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
        var bookingPlaceViewModel = await _repository.GetBookingPlaceAsync(id);
        if (bookingPlaceViewModel == null)
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

    [HttpDelete("{id}")]
    [ProducesResponseType(typeof(BaseResponse<bool>), 200)]
    public async Task<IActionResult> DeleteBooking(int id)
    {
        var user = await _authService.GetCurrentUser(User);
        var bookingDao = await _repository.GetBookingAsync(id);
        if (bookingDao == null)
        {
            return HandleError(new Exception("Booking not found"));
        }
        var bookingPlace = await _repository.GetBookingPlaceAsync(bookingDao.BookingPlaceId);

        // Check if deleting released booking
        if (bookingPlace.ReservedForId.HasValue)           
        {
            if (bookingPlace.ReservedForId.Value != user.Id || bookingDao.BookedById != user.Id)
            {
                return HandleError(new Exception("You are not allowed to delete this booking"));
            }            
        } else
        {
            // check for basic booking
            if (bookingDao.BookedById != user.Id)
            {
                return HandleError(new Exception("You are not allowed to delete this booking"));
            }
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
    [HttpDelete("Admin/{id}")]
    [ProducesResponseType(typeof(BaseResponse<bool>), 200)]
    public async Task<IActionResult> DeleteBookingByAdmin(int id)
    {
        var bookingPlaceViewModel = await _repository.GetBookingAsync(id);
        if (bookingPlaceViewModel == null)
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
                FloorId = item.FloorId,
                Bookings = await GetBookingViewModels(item.Bookings),
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

    private async Task<List<BookingPlaceWithBookingsViewModel>> GetBookingPlaceViewModels(IEnumerable<BookingPlaceDao> bookingPlaceDaos, BookingPlaceItemTypeEnum? bookingPlaceItemType)
    {
        var bookingPlaceViewModels = new List<BookingPlaceWithBookingsViewModel>();
        foreach (var bookingPlaceDao in bookingPlaceDaos)
        {
            var bookingPlaceViewModel = await GetBookingPlaceViewModel(bookingPlaceDao);
            if (bookingPlaceItemType != null && bookingPlaceItemType == bookingPlaceViewModel.ItemType)
            {
                bookingPlaceViewModels.Add(bookingPlaceViewModel);
            }

            if (bookingPlaceItemType == null)
            {
                bookingPlaceViewModels.Add(bookingPlaceViewModel);
            }

        }
        return bookingPlaceViewModels;
    }

    private async Task<BookingPlaceWithBookingsViewModel> GetBookingPlaceViewModel(BookingPlaceDao bookingPlaceDao)
    {
        return new BookingPlaceWithBookingsViewModel
        {
            Id = bookingPlaceDao.Id,
            Name = bookingPlaceDao.Name,
            Type = bookingPlaceDao.Type,
            ItemType = bookingPlaceDao.ItemType,
            FloorId = bookingPlaceDao.FloorId,
            ReservedForUserId = bookingPlaceDao.ReservedForId,
            ReservedForUserVm = bookingPlaceDao.ReservedForId != null ? await GetUserViewModel(bookingPlaceDao.ReservedForId.Value) : null,
            Bookings = await GetBookingViewModels(bookingPlaceDao.Bookings),
        };
    }

    private async Task<UserViewModel> GetUserViewModel(int userId)
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());
        return _mapper.Map<UserViewModel>(user);
    }
}
