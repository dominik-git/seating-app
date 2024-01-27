using BookingApp.Enums;

namespace BookingApp.Models
{
    public class BookingReleasePlaceRequest
    {
        public int BookingPlaceId { get; set; }
        public DateTime AvailableFrom { get; set; }
        public DateTime AvailableTo { get; set; }
    }
}
