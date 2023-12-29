using BookingApp.Enums;

namespace BookingApp.Models
{
    public class BookingRequest
    {
        public int BookingPlaceId { get; set; }
        public DateTime BookingDate { get; set; }
    }
}
