using BookingApp.Enums;

namespace BookingApp.Models
{
    public class BookingTypeRequest
    {
        public int Id { get; set; }
        public BookingPlaceTypeEnum Type { get; set; }
        public int? ReservedForId { get; set; }
    }
}
