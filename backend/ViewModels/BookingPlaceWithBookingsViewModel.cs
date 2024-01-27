using BookingApp.Enums;

namespace BookingApp.ViewModels
{
    public class BookingPlaceWithBookingsViewModel
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public BookingPlaceTypeEnum Type { get; set; }
        public BookingPlaceItemTypeEnum ItemType { get; set; }
        public bool AvailableForBooking { get; set; }
        public DateTime? AvailableFrom { get; set; }
        public DateTime? AvailableTo { get; set; }
        public int FloorId { get; set; }
        public int? ReservedForUserId { get; set; }
        public UserViewModel? ReservedForUserVm { get; set; }
        public List<BookingViewModel> Bookings { get; set; } = new List<BookingViewModel>();
    }
}
