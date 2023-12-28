using BookingApp.Enums;

namespace BookingApp.Models
{
    public class BookingViewModel
    {
        public int BookingPlaceId { get; set; }
        public int Id { get; set; }
        public BookingStateEnum State { get; set; }
        public DateTime BookingDate { get; set; }     
    }
}
