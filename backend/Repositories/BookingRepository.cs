using BookingApp.Daos;
using BookingApp.Database;
using BookingApp.Enums;
using BookingApp.Models;
using Microsoft.EntityFrameworkCore;

namespace BookingApp.Repositories
{
    public class BookingRepository : IBookingRepository
    {
        private readonly ApplicationDbContext _context;
        private const int DefaultDaysForBooking = 7;

        public BookingRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<BookingPlaceDao>> GetBookingPlacesAsync()
        {
            return await _context.BookingPlaces.ToListAsync();
        }

        public async Task<BookingPlaceDao> GetBookingPlaceAsync(int id)
        {
            var bookingPlace = await _context.BookingPlaces.FindAsync(id);
            if (bookingPlace == null)
            {
                throw new Exception("Entity not found");
            }
            return bookingPlace;
        }

        public async Task<BookingPlaceDao> UpdateBookingPlaceAsync(BookingPlaceDao bookingPlace)
        {
            var entity = _context.BookingPlaces.FirstOrDefault(item => item.Id == bookingPlace.Id);
            if (entity != null)
            {
                var updatedItem = _context.Update(bookingPlace);
                await _context.SaveChangesAsync();
                return updatedItem.Entity;
            }
            return null;
        }

        public async Task<BookingPlaceDao> CreateBookingPlaceAsync(BookingPlaceDao bookingPlace)
        {
            var existingItem = await _context.BookingPlaces.FirstOrDefaultAsync(item => item.Name == bookingPlace.Name);
            if (existingItem != null)
            {
                throw new Exception("Entity with same name already exist");
            }
            bookingPlace.CreatedDate = DateTime.UtcNow;
            var createdItem = _context.BookingPlaces.Add(bookingPlace);
            await _context.SaveChangesAsync();
            return createdItem.Entity;
        }

        public async Task DeleteBookingPlaceAsync(int id)
        {
            var bookingPlace = await _context.BookingPlaces.FindAsync(id);
            _context.BookingPlaces.Remove(bookingPlace);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<BookingPlaceDao>> GetBookingsByGroupAsync(int groupId)
        {
            return await _context.BookingPlaces.Where(item => item.GroupId == groupId).ToListAsync();
        }

        public async Task CreateOrUpdateStatesAsync(BookingsModel request)
        {
            List<BookingDao> entitiesForUpdate = new List<BookingDao>();
            List<BookingDao> entitiesForCreate = new List<BookingDao>();
            foreach (var booking in request.Bookings)
            {
                var entity = _context.Bookings.FirstOrDefault(item => item.Id == booking.Id);
                if (entity != null)
                {
                    entity.State = booking.State;
                    entity.BookedById = booking.BookedBy;
                    entity.ModifiedDate = DateTime.UtcNow;
                    entitiesForUpdate.Add(entity);
                }
                else
                {
                    var newEntity = new BookingDao
                    {
                        BookingPlaceId = booking.BookingPlaceId,
                        State = booking.State,
                        CreatedDate = DateTime.UtcNow,
                        CreatedById = booking.BookedBy,
                        BookedById = booking.BookedBy,
                        BookingDate = booking.BookingDate.Value
                    };
                }
            }
            _context.Bookings.UpdateRange(entitiesForUpdate);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateTypeAsync(List<int> ids, BookingPlaceTypeEnum type)
        {
            List<BookingPlaceDao> entitiesForUpdate = new List<BookingPlaceDao>();
            foreach (var id in ids)
            {
                var entity = _context.BookingPlaces.FirstOrDefault(item => item.Id == id);
                if (entity != null)
                {
                    entity.Type = type;
                    entity.ModifiedDate = DateTime.UtcNow;
                    entitiesForUpdate.Add(entity);
                }
            }
            if (entitiesForUpdate.Count > 0)
            {
                _context.UpdateRange(entitiesForUpdate);
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateStateAsync(BookingModel request)
        {
            var entity = _context.Bookings.FirstOrDefault(item => item.Id == request.Id);
            if (entity != null)
            {
                if (!CanUpdateBooking(entity, request))
                {

                }
                entity.State = request.State;
                entity.BookedById = request.BookedBy;
                entity.ModifiedDate = DateTime.UtcNow;
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateTypeAsync(int id, BookingPlaceTypeEnum type, int? reserverForId)
        {
            var entity = _context.BookingPlaces.FirstOrDefault(item => item.Id == id);
            if (entity != null)
            {
                entity.Type = type;
                entity.ModifiedDate = DateTime.UtcNow;
                entity.ReservedForId = reserverForId;
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<BookingDao>> GetBookingsAsync()
        {
            return await _context.Bookings.ToListAsync();
        }

        public async Task<BookingDao> GetBookingAsync(int id)
        {
            return await _context.Bookings.FirstOrDefaultAsync(item => item.Id == id);
        }
        public async Task<BookingDao> GetBookingByIdAndBookingDateAsync(int id, DateTime bookingDate)
        {
            return await _context.Bookings.FirstOrDefaultAsync(item => item.Id == id && item.BookingDate.Date == bookingDate.Date);
        }

        public async Task<List<BookingDao>> GetBookingByBookingPlaceIdAsync(int bookingPlaceId)
        {
            return await _context.Bookings.Where(item => item.BookingPlaceId == bookingPlaceId).ToListAsync();
        }

        public async Task<List<BookingDao>> GetBookingByBookingPlaceIdWithDateAsync(int bookingPlaceId)
        {
            var todaysDate = DateTime.UtcNow.Date;
            var endDate = todaysDate.AddDays(DefaultDaysForBooking);
            return await _context.Bookings
                .Include(item => item.BookingPlace)
                .Where(item => item.BookingPlaceId == bookingPlaceId && item.BookingDate.Date > todaysDate && item.BookingDate.Date < endDate).ToListAsync();
        }

        public async Task<BookingDao> CreateBookingAsync(BookingDao booking)
        {
            var bookingPlace = await _context.BookingPlaces.FirstOrDefaultAsync(item => item.Id == booking.BookingPlaceId);
            if (bookingPlace == null || !CanCreateBooking(booking, bookingPlace))
            {
                throw new Exception("Booking is not allowed");
            }
            booking.CreatedDate = DateTime.UtcNow;
            var createdItem = _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
            return createdItem.Entity;
        }

        public async Task DeleteBookingAsync(int id)
        {

            var booking = await _context.Bookings.FindAsync(id);
            if (booking != null)
            {
                _context.Bookings.Remove(booking);
                await _context.SaveChangesAsync();
            }
        }
        private static bool CanUpdateBooking(BookingDao booking, BookingModel request)
        {
            if (request.IsAdmin)
            {
                return true;
            }
            if (booking.BookedById != request.BookedBy)
            {
                return false;
            }
            if (booking.BookingDate == request.BookingDate)
            {
                return false;
            }
            return true;
        }

        private static bool CanCreateBooking(BookingDao booking, BookingPlaceDao bookingPlace)
        {
            if (bookingPlace.Type == BookingPlaceTypeEnum.Fixed &&
                (bookingPlace.AvailableFrom.HasValue &&
                booking.BookingDate < bookingPlace.AvailableFrom || bookingPlace.AvailableTo.HasValue && booking.BookingDate > bookingPlace.AvailableTo))
            {
                return false;
            }
            return true;
        }

        public async Task<List<BookingPlaceDao>> GetBookingPlacesWithBookingsByFloorIdAsync(int floorId, DateTime? bookingDate)
        {
            if (floorId == default)
            {
                throw new Exception("Floor Id is required");
            }
            var query = await _context.BookingPlaces
                .Include(x => x.Floor)
                .Include(item => item.Bookings                
                    .Where(y => !bookingDate.HasValue || y.BookingDate.Date == bookingDate.Value.Date))
                .Where(item => item.FloorId == floorId)
                .ToListAsync();

            return query;
        }
    }
}
