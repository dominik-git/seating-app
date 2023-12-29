﻿using BookingApp.Enums;

namespace BookingApp.Models
{
    public class BookingViewModel
    {
        public int BookingId { get; set; }
        public int BookingPlaceId { get; set; }
        public BookingStateEnum State { get; set; }
        public DateTime BookingDate { get; set; }
        public string BookedBy { get; set; }
    }
}