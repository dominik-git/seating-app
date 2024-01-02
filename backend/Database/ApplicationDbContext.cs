using BookingApp.Daos;
using BookingApp.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace BookingApp.Database
{
    public class ApplicationDbContext : IdentityDbContext<User, Role, long, UserClaim, UserRole, UserLogin, RoleClaim, UserToken>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }

        public DbSet<BookingPlaceDao> BookingPlaces { get; set; }
        public DbSet<BookingDao> Bookings { get; set; }
        public DbSet<GroupDao> Groups { get; set; }
        public DbSet<FloorDao> Floors { get; set; }
        public DbSet<User> BookingUsers { get; set; }

    }
}
