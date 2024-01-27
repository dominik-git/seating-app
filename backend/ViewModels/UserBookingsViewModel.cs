﻿using BookingApp.Enums;
using BookingApp.Models;

namespace BookingApp.ViewModels
{
    public class UserBookingsViewModel
    {   
        public List<UserBookingViewModel> UserBookingsVm { get; set; }
        public List<BookingPlaceViewModel> UserFixedPlacesVm { get; set; }
        public UserViewModel? BookedByUserVm { get; set; }
    }
}
