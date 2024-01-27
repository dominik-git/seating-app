using BookingApp.Enums;
using BookingApp.Models;

namespace BookingApp.ViewModels
{
    public class UserBookingsViewModel
    {   
        public List<UserBookingViewModel> UserBookings { get; set; }
        public UserViewModel? BookedByUserVm { get; set; }
    }
}
