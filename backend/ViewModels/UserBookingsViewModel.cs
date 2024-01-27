using BookingApp.Enums;
using BookingApp.Models;

namespace BookingApp.ViewModels
{
    public class UserBookingsViewModel
    {   
        public List<UserBookingViewModel> ParkingsVm { get; set; }  
        public List<UserBookingViewModel> BookingsVm { get; set; }
        public List<BookingPlaceViewModel> FixedPlacesVm { get; set; }
        public List<BookingPlaceViewModel> FixedParkingsVm { get; set; }
        public UserViewModel? BookedByUserVm { get; set; }
    }
}
