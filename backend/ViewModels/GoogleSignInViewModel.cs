using System.ComponentModel.DataAnnotations;

namespace BookingApp.ViewModels
{
    public class GoogleSignInViewModel
    {
        [Required]
        public string IdToken { get; set; }
    }
}
