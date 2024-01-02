using BookingApp.Enums;

namespace BookingApp.ViewModels
{
    public class FloorViewModel : FloorSimpleViewModel
    {
        public List<BookingPlaceWithBookingsViewModel> BookingPlaces { get; set; } = new List<BookingPlaceWithBookingsViewModel>();
    }
}
