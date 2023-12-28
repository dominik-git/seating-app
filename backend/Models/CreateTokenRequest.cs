using BookingApp.Enums;

namespace BookingApp.Models
{
    public class CreateTokenRequest
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public bool IsAdmin { get; set; }

    }
}
