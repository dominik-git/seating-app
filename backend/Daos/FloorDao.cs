using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookingApp.Daos
{
    public class FloorDao
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public string Svg { get; set; }
        public virtual ICollection<BookingPlaceDao> BookingPlaces { get; set; } = new List<BookingPlaceDao>();

    }
}
