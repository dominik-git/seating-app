using BookingApp.Daos;
using BookingApp.Database;
using BookingApp.Enums;
using BookingApp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace BookingApp.Repositories
{
    public class BookingRepository : IBookingRepository
    {
        private readonly BookingContext _context;

        public BookingRepository(BookingContext context)
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
            if(bookingPlace == null)
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

        public async Task CreateOrUpdateStatesAsync(BookingsRequest request)
        {
            List<BookingDao> entitiesForUpdate = new List<BookingDao>();
            List<BookingDao> entitiesForCreate = new List<BookingDao>();
            foreach (var booking in request.Bookings)
            {
                var entity = _context.Bookings.FirstOrDefault(item => item.Id == booking.Id);
                if (entity != null)
                {
                    entity.State = booking.State;
                    entity.BookedBy = booking.BookedBy;
                    entity.ModifiedDate = DateTime.UtcNow;
                    entitiesForUpdate.Add(entity);
                } else
                {
                    var newEntity = new BookingDao
                    {
                        BookingPlaceId = booking.BookingPlaceId,
                        State = booking.State,
                        CreatedDate = DateTime.UtcNow,
                        CreatedBy = booking.BookedBy,
                        BookedBy = booking.State == BookingStateEnum.Booked || booking.State == BookingStateEnum.Blocked ? booking.BookedBy : "",
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

        public async Task UpdateStateAsync(BookingRequest request)
        {            
            var entity = _context.Bookings.FirstOrDefault(item => item.Id == request.Id);
            if (entity != null)
            {
                if (!CanUpdateBooking(entity, request))
                {

                }
                entity.State = request.State;
                entity.BookedBy = request.State == BookingStateEnum.Booked || request.State == BookingStateEnum.Blocked ? request.BookedBy : "";
                entity.ModifiedDate = DateTime.UtcNow;                
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateTypeAsync(int id, BookingPlaceTypeEnum type)
        {
            var entity = _context.BookingPlaces.FirstOrDefault(item => item.Id == id);
            if (entity != null)
            {
                entity.Type = type;
                entity.ModifiedDate = DateTime.UtcNow;
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

        public async Task<BookingDao> CreateBookingAsync(BookingDao booking)
        {
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
        private static bool CanUpdateBooking(BookingDao booking, BookingRequest request)
        {
            if(request.IsAdmin)
            {
                  return true;
            }
            if(booking.BookedBy != request.BookedBy)
            {
                return false;
            }
            if(booking.BookingDate == request.BookingDate)
            {
                return false;
            }
            return true;
        }        
    }
}
