using BookingApp.Common;
using BookingApp.ViewModels;

namespace BookingApp.Interfaces
{
    public interface IAuthService
    {
        Task<BaseResponse<JwtResponseViewModel>> SignInWithGoogle(GoogleSignInViewModel model);

    }
}
