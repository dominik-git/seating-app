using BookingApp.Enums;

namespace BookingApp.Models
{
    public class BookingStateRequest
    {
        public int Id { get; set; }
        public BookingStateEnum State { get; set; }
    }
}
