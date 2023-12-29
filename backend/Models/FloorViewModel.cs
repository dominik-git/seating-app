using BookingApp.Enums;

namespace BookingApp.Models
{
    public class FloorViewModel : FloorSimpleViewModel
    {
        public List<BookingPlaceWithBookingsViewModel> BookingPlaces { get; set; } = new List<BookingPlaceWithBookingsViewModel>();
    }
}
