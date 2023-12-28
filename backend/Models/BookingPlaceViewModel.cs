using BookingApp.Enums;

namespace BookingApp.Models
{
    public class BookingPlaceViewModel
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public BookingPlaceTypeEnum Type { get; set; }
        public BookingPlaceItemTypeEnum ItemType { get; set; }
        public BookingStateEnum State { get; set; }
        public string Floor { get; set; }
    }
}
