using BookingApp.Daos;
using BookingApp.Enums;
using BookingApp.Models;

public interface IBookingRepository
{
    Task<IEnumerable<BookingPlaceDao>> GetBookingPlacesAsync();
    Task<IEnumerable<BookingDao>> GetBookingsAsync();
    Task<BookingPlaceDao> GetBookingPlaceAsync(int id);
    Task<List<BookingDao>> GetBookingByBookingPlaceIdAsync(int bookingPlaceId);
    Task<BookingDao> GetBookingAsync(int id);
    Task<BookingPlaceDao> CreateBookingPlaceAsync(BookingPlaceDao booking);
    Task<BookingPlaceDao> UpdateBookingPlaceAsync(BookingPlaceDao booking);
    Task<BookingDao> CreateBookingAsync(BookingDao booking);
    Task CreateOrUpdateStatesAsync(BookingsModel request);
    Task UpdateTypeAsync(List<int> ids, BookingPlaceTypeEnum type);
    Task UpdateStateAsync(BookingModel request);
    Task UpdateTypeAsync(int id, BookingPlaceTypeEnum type);
    Task DeleteBookingAsync(int id);

    Task DeleteBookingPlaceAsync(int id);
    Task<BookingDao> GetBookingByIdAndBookingDateAsync(int id, DateTime bookingDate);
    Task<List<BookingPlaceDao>> GetBookingPlacesWithBookingsByFloorIdAsync(int floorId, DateTime? bookingDate);
    Task<List<BookingDao>> GetBookingByBookingPlaceIdWithDateAsync(int bookingPlaceId);
}