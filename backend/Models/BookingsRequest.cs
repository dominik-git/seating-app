using BookingApp.Enums;

namespace BookingApp.Models
{
    public class BookingsRequest
    {
        public List<BookingRequest> Bookings { get; set; } = new List<BookingRequest>();
    }
}
