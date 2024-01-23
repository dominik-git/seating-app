using BookingApp.Enums;
using BookingApp.Models;

namespace BookingApp.ViewModels
{
    public class BookingViewModel
    {
        public int BookingId { get; set; }
        public int BookingPlaceId { get; set; }
        public BookingStateEnum State { get; set; }
        public DateTime BookingDate { get; set; }  
        public int? BookedById { get; set; }
        public UserViewModel? BookedByUserVm { get; set; }
    }
}
