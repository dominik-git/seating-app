using BookingApp.Common;
using BookingApp.Models;
using BookingApp.ViewModels;

namespace BookingApp.Identity
{
    public interface IGoogleAuthService
    {
        Task<BaseResponse<User>> GoogleSignIn(GoogleSignInViewModel model);
    }
}
