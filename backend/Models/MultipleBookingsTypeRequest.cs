using BookingApp.Enums;

namespace BookingApp.Models
{
    public class MultipleBookingsTypeRequest
    {
        public List<int> Ids { get; set; }
        public BookingPlaceTypeEnum Type { get; set; }
    }
}
