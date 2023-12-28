using AutoMapper;
using BookingApp.Daos;
using BookingApp.Enums;
using BookingApp.Identity;
using BookingApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

[Route("api/[controller]")]
[ApiController]
public class BookingController : ControllerBase
{
    private readonly IBookingRepository _repository;
    private readonly IMapper _mapper;
    public BookingController(IBookingRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    // GET: api/Booking
    [HttpGet("/GetAllBookingPlaces")]
    public async Task<ActionResult<IEnumerable<BookingPlaceViewModel>>> GetAllBookingPlaces()
    {
        var bookingPlaceDaos = await _repository.GetBookingsAsync();
        return Ok(_mapper.Map<IEnumerable<BookingPlaceViewModel>>(bookingPlaceDaos));
    }

    // GET: api/Booking/5
    [HttpGet("BookingPlace/{id}")]
    public async Task<ActionResult<BookingPlaceViewModel>> GetBookingPlace(int id)
    {
        var bookingPlaceDao = await _repository.GetBookingPlaceAsync(id);

        if (bookingPlaceDao == null)
        {
            return NotFound();
        }

        return _mapper.Map<BookingPlaceViewModel>(bookingPlaceDao);
    }

    [HttpGet("GetBookingById/{id}")]
    public async Task<ActionResult<BookingViewModel>> GetBooking(int id)
    {
        var bookingDao = await _repository.GetBookingAsync(id);

        if (bookingDao == null)
        {
            return NotFound();
        }

        return _mapper.Map<BookingViewModel>(bookingDao);
    }

    [HttpGet("GetByBookingPlaceId/{id}")]
    public async Task<ActionResult<List<BookingViewModel>>> GetByBookingPlaceId(int id)
    {
        var bookingDaos = await _repository.GetBookingByBookingPlaceIdAsync(id);    

        return _mapper.Map<List<BookingViewModel>>(bookingDaos);
    }

    // PUT: api/Booking/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, BookingPlaceViewModel bookingPlaceViewModel)
    {
        if (id != bookingPlaceViewModel.Id)
        {
            return BadRequest();
        }

        var userEmail = this.User.FindFirstValue(ClaimTypes.Email) ?? "";
        var admin = this.User.FindFirstValue("admin") ?? "false";
        bool isAdmin = bool.Parse(admin);
        var bookingItem = await _repository.GetBookingPlaceAsync(id);
        if (bookingItem == null)
        {
            return NotFound();
        }
        if (!isAdmin || userEmail != bookingItem.ReservedFor)
        {
            return BadRequest("You are not allowed to udate this entity");
        }
        var bookingDao = _mapper.Map<BookingPlaceDao>(bookingPlaceViewModel);
        bookingDao.ModifiedDate = DateTime.UtcNow;
        await _repository.UpdateBookingPlaceAsync(bookingDao);

        return NoContent();
    }

    [Authorize(Policy = IdentityData.AdminUserPolicyName)]
    [HttpPut("/Admin/CreateOrUpdate")]
    public async Task<IActionResult> CreateOrUpdateBookings(BookingsViewModel request)
    {
        var userEmail = this.User.Claims.FirstOrDefault(item => item.Type == "email")?.Value;
        bool isAdmin = string.IsNullOrEmpty(this.User.FindFirstValue("admin")) && bool.Parse(this.User.FindFirstValue("admin"));

        foreach (var bookingVm in request.Bookings)
        {
            var existingBooking = await _repository.GetBookingByIdAndBookingDateAsync(bookingVm.Id, bookingVm.BookingDate);
            var bookingRequest = new BookingRequest
            {
                Id = bookingVm.Id,
                State = bookingVm.State,
                BookingDate = bookingVm.BookingDate.ToUniversalTime(),
                BookedBy = userEmail,
                IsAdmin = isAdmin,
                BookingPlaceId = bookingVm.BookingPlaceId
            };
            if (existingBooking != null)
            {
                if (existingBooking.BookedBy != userEmail)
                {
                    return BadRequest("Already reserved by another user");
                }
                try
                {
                    await _repository.UpdateStateAsync(bookingRequest);
                }
                catch (Exception)
                {
                    throw;
                }
            }
            else
            {
                var newBooking = new BookingDao
                {
                    BookingPlaceId = bookingVm.BookingPlaceId,
                    State = bookingVm.State,
                    CreatedDate = DateTime.UtcNow,
                    CreatedBy = userEmail,
                    BookingDate = bookingVm.BookingDate.ToUniversalTime(),
                    BookedBy = userEmail
                };
                try
                {
                    await _repository.CreateBookingAsync(newBooking);
                }
                catch (Exception)
                {
                    throw;
                }
            }
        }


        return Ok();
    }

    [HttpPut("CreateOrUpdateBooking")]
    public async Task<IActionResult> CreateOrUpdateBooking(BookingViewModel bookingVm)
    {
        var userEmail = this.User.FindFirstValue(ClaimTypes.Email) ?? "";
        var admin = this.User.FindFirstValue("admin") ?? "false";
        bool isAdmin = bool.Parse(admin);

        if (bookingVm.BookingDate < DateTime.UtcNow)
        {
            return BadRequest("Booking time cannot be in the past");
        }

        var bookingPlace = await _repository.GetBookingPlaceAsync(bookingVm.BookingPlaceId);
        if (bookingPlace.Type == BookingPlaceTypeEnum.Fixed)
        {
            if (!bookingPlace.AvailableForBooking &&
            !string.IsNullOrEmpty(bookingPlace.ReservedFor) &&
            bookingPlace.ReservedFor != userEmail)
            {
                return BadRequest("This booking place is reserved for " + bookingPlace.ReservedFor);
            }

            if (bookingPlace.AvailableForBooking &&
                bookingVm.BookingDate < bookingPlace.AvailableFrom &&
                bookingVm.BookingDate > bookingPlace.AvailableTo)
            {
                return BadRequest("This booking place is reserved for day you choosed.");
            }
        }

        var existingBooking = await _repository.GetBookingByIdAndBookingDateAsync(bookingVm.Id, bookingVm.BookingDate);
        var bookingRequest = new BookingRequest
        {
            Id = bookingVm.Id,
            State = bookingVm.State,
            BookingDate = bookingVm.BookingDate.ToUniversalTime(),
            BookedBy = userEmail,
            IsAdmin = isAdmin,
            BookingPlaceId = bookingVm.BookingPlaceId
        };
        if (existingBooking != null)
        {
            if (existingBooking.BookedBy != userEmail)
            {
                return BadRequest("Already reserved by another user");
            }
            try
            {
                await _repository.UpdateStateAsync(bookingRequest);
            }
            catch (Exception)
            {
                throw;
            }
        }
        else
        {
            var newBooking = new BookingDao
            {
                BookingPlaceId = bookingVm.BookingPlaceId,
                State = bookingVm.State,
                CreatedDate = DateTime.UtcNow,
                CreatedBy = userEmail,
                BookingDate = bookingVm.BookingDate.ToUniversalTime(),
                BookedBy = userEmail
            };
            try
            {
                await _repository.CreateBookingAsync(newBooking);
            }
            catch (Exception)
            {
                throw;
            }
        }
        return Ok();
    }

    // PUT: api/Booking/ChangeState
    [HttpPut("/ChangeTypes")]
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

    [HttpPut("/ChangeType")]
    public async Task<IActionResult> ChangeType(BookingTypeRequest request)
    {
        try
        {
            await _repository.UpdateTypeAsync(request.Id, request.Type);
        }
        catch (Exception)
        {
            throw;
        }

        return Ok();
    }

    // POST: api/Booking
    [Authorize(Policy = IdentityData.AdminUserPolicyName)]
    [HttpPost]
    public async Task<ActionResult<BookingPlaceViewModel>> Post(BookingPlaceViewModel bookingPlaceViewModel)
    {
        string userEmail = this.User.FindFirstValue(ClaimTypes.Email) ?? "";
        var bookingPlaceDao = _mapper.Map<BookingPlaceDao>(bookingPlaceViewModel);
        bookingPlaceDao.CreatedBy = userEmail;
        var createdDao = await _repository.CreateBookingPlaceAsync(bookingPlaceDao);
        if (createdDao != null)
        {
            await _repository.CreateBookingAsync(new BookingDao
            {
                BookingPlaceId = createdDao.Id,
                State = bookingPlaceViewModel.State,
                CreatedDate = DateTime.UtcNow,
                CreatedBy = userEmail,
            });
        }

        return Ok(_mapper.Map<BookingPlaceViewModel>(createdDao));
    }

    // DELETE: api/Booking/5
    [Authorize(Policy = IdentityData.AdminUserPolicyName)]
    [HttpDelete("/BookingPlace/{id}")]
    public async Task<IActionResult> DeleteBookingPlace(int id)
    {
        var BookingPlaceViewModel = await _repository.GetBookingPlaceAsync(id);
        if (BookingPlaceViewModel == null)
        {
            return NotFound();
        }

        await _repository.DeleteBookingPlaceAsync(id);

        return NoContent();
    }

    [Authorize(Policy = IdentityData.AdminUserPolicyName)]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBooking(int id)
    {
        var BookingPlaceViewModel = await _repository.GetBookingAsync(id);
        if (BookingPlaceViewModel == null)
        {
            return NotFound();
        }

        await _repository.DeleteBookingAsync(id);

        return NoContent();
    }


}
