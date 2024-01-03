using BookingApp.Enums;

namespace BookingApp.Models
{
    public class BookingModel
    {
        public int BookingPlaceId { get; set; }
        public int Id { get; set; }
        public BookingStateEnum State { get; set; }
        public DateTime? BookingDate { get; set; }        
        public int BookedBy { get; set; }
        public bool IsAdmin { get; set; }

    }
}
