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
        [AllowAnonymous]
        [HttpPut()]
        public async Task<IActionResult> CreateToken([FromBody] CreateTokenRequest request)
        {
            Claim[] claims = new Claim[]
                {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, request.Email),
                new Claim(ClaimTypes.Name, request.Name),
                new Claim(ClaimTypes.Email, request.Email),
                new Claim("admin", request.IsAdmin.ToString(), ClaimValueTypes.Boolean)
                };

            var key = _config.GetValue<string>(
                "JwtSettings:Key");
            var issuer = _config.GetValue<string>(
                "JwtSettings:Issuer");
            var audience = _config.GetValue<string>(
                "JwtSettings:Audience");
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));

            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var token = new
                   JwtSecurityToken(
                                   issuer,
                                   audience,
                                   claims,
                                   expires: DateTime.Now.AddDays(30),
                                   signingCredentials: signingCredentials);
            return Ok(new JwtSecurityTokenHandler().WriteToken(token));
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
