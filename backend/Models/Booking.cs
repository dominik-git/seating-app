using BookingApp.Enums;

namespace BookingApp.Models
{
    public class BookingRequestWithDateRange
    {
        public int BookingPlaceId { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
    }    
}
