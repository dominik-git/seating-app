using BookingApp.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookingApp.Daos
{
    public class GroupDao
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public virtual ICollection<BookingPlaceDao> BookingPlaces { get; set; } = new List<BookingPlaceDao>();

        [Required]
        public DateTime CreatedDate { get; set; }        
        
    }
}
