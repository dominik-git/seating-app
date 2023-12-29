using BookingApp.Enums;

namespace BookingApp.Models
{
    public class CreateFloorWithBookingPlacesRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Svg { get; set; }
        public List<BookingPlaceViewModel> BookingPlaces { get; set; }
    }
}
