using BookingApp.Daos;
using Microsoft.EntityFrameworkCore;

namespace BookingApp.Database
{
    public class BookingContext : DbContext
    {
        public BookingContext()
        {
        }
        public BookingContext(DbContextOptions<BookingContext> options) : base(options)
        {
        }
       

        public DbSet<BookingPlaceDao> BookingPlaces { get; set; }
        public DbSet<BookingDao> Bookings { get; set; }
        public DbSet<GroupDao> Groups { get; set; }
        public DbSet<FloorDao> Floors { get; set; }
    }
}
