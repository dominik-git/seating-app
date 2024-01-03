using BookingApp.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookingApp.Daos
{
    public class BookingPlaceDao
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public required string Name { get; set; }

        [Required]
        public BookingPlaceTypeEnum Type { get; set; }
        [Required]
        public BookingPlaceItemTypeEnum ItemType { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }        
        [Required]
        public int CreatedById { get; set; }
        [Required]
        public int FloorId { get; set; }
        
        public int? ReservedForId { get; set; }

        public DateTime? ModifiedDate { get; set; }
        public bool AvailableForBooking { get; set; }
        public DateTime? AvailableFrom { get; set; }
        public DateTime? AvailableTo { get; set; }

        public int? GroupId { get; set; }
        public virtual GroupDao? Group { get; set; }
        public FloorDao Floor { get; set; } = null!;
        public ICollection<BookingDao> Bookings { get; } = new List<BookingDao>();
    }
}
