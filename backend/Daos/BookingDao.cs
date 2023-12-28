using BookingApp.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookingApp.Daos
{
    public class BookingDao
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int BookingPlaceId { get; set; }
        
        [Required]
        public BookingStateEnum State { get; set; }        
        [Required]
        public DateTime CreatedDate { get; set; }
        [Required]
        public string CreatedBy { get; set; }
        public string BookedBy { get; set; }
        public DateTime BookingDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public BookingPlaceDao BookingPlace { get; set; } = null!;
    }
}
