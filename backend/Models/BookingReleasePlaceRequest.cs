using BookingApp.Enums;

namespace BookingApp.Models
{
    public class BookingReleasePlaceRequest
    {
        public int BookingPlaceId { get; set; }
        public List<DateTime> ReleaseDates { get; set; }
    }
}
