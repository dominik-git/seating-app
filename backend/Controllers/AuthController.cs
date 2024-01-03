using BookingApp.Common;
using BookingApp.Interfaces;
using BookingApp.Models;
using BookingApp.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BookingApp.Controllers
{
    
    [ApiController]
    [Route("api/[controller]/[action]")]

    public class AuthController : BaseController
    {
        private readonly IConfiguration _config;
        private readonly IAuthService _authService;
        public AuthController(IConfiguration config, IAuthService authService)
        {
            _config = config;
            _authService = authService;
        }

        [HttpPost]
        [ProducesResponseType(typeof(BaseResponse<bool>), 200)]
        public async Task<IActionResult> GoogleSignIn(GoogleSignInViewModel model)
        {
            try
            {
                return ReturnResponse(await _authService.SignInWithGoogle(model));
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }
    }
}
