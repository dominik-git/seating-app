﻿using BookingApp.Enums;

namespace BookingApp.ViewModels
{
    public class UserBookingViewModel
    {
        public int BookingId { get; set; }
        public int BookingPlaceId { get; set; }
        public BookingStateEnum State { get; set; }
        public DateTime BookingDate { get; set; }
        public int? BookedById { get; set; }
        public BookingPlaceWithBookingsViewModel? BookingPlaceVm { get; set; }
    }
}
