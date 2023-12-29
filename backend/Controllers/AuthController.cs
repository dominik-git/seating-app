using BookingApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BookingApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        public AuthController(IConfiguration config)
        {
            _config = config;
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
    }
}
