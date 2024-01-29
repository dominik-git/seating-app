using BookingApp.Common;
using BookingApp.Models;
using BookingApp.ViewModels;
using System.Security.Claims;

namespace BookingApp.Interfaces
{
    public interface IAuthService
    {
        Task<BaseResponse<JwtResponseViewModel>> SignInWithGoogle(GoogleSignInViewModel model);
        Task<UserModel> GetCurrentUser(ClaimsPrincipal claims);
    }
}
