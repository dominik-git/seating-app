using BookingApp.Common;
using BookingApp.Configuration;
using BookingApp.Database;
using BookingApp.Identity;
using BookingApp.Interfaces;
using BookingApp.Models;
using BookingApp.ViewModels;
using IdentityModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Asn1.Ocsp;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BookingApp.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly IGoogleAuthService _googleAuthService;
        private readonly UserManager<User> _userManager;
        private readonly Jwt _jwt;

        public AuthService(
            ApplicationDbContext context,
            IGoogleAuthService googleAuthService,
            UserManager<User> userManager,
            IOptions<Jwt> jwt
            )
        {
            _context = context;
            _googleAuthService = googleAuthService;
            _userManager = userManager;
            _jwt = jwt.Value;
        }
        public async Task<BaseResponse<JwtResponseViewModel>> SignInWithGoogle(GoogleSignInViewModel model)
        {
            var response = await _googleAuthService.GoogleSignIn(model);

            if (response.Errors.Any())
                return new BaseResponse<JwtResponseViewModel>(response.ResponseMessage, response.Errors);

            var jwtResponse = CreateJwtToken(response.Data);

            var data = new JwtResponseViewModel
            {
                Token = jwtResponse,
            };

            return new BaseResponse<JwtResponseViewModel>(data);
        }

        public async Task<UserModel> GetCurrentUser(ClaimsPrincipal claims)
        {
            var userEmail = claims.FindFirstValue(ClaimTypes.Email) ?? "";
            var admin = claims.FindFirstValue("admin") ?? "false";
            bool isAdmin = bool.Parse(admin);
            var user = await _userManager.FindByEmailAsync(userEmail) ?? throw new Exception("User not found");
            return new UserModel
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                IsAdmin = isAdmin
            };
        }

        private string CreateJwtToken(User user)
        {

            var key = Encoding.ASCII.GetBytes(_jwt.Secret);

            var userClaims = BuildUserClaims(user);

            var signKey = new SymmetricSecurityKey(key);

            var jwtSecurityToken = new JwtSecurityToken(
                issuer: _jwt.ValidIssuer,
                notBefore: DateTime.UtcNow,
                audience: _jwt.ValidAudience,
                expires: DateTime.UtcNow.AddMinutes(Convert.ToInt32(_jwt.DurationInMinutes)),
                claims: userClaims,
                signingCredentials: new SigningCredentials(signKey, SecurityAlgorithms.HmacSha256));

            return new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
        }

        private List<Claim> BuildUserClaims(User user)
        {
            var userClaims = new List<Claim>()
            {
                new Claim(JwtClaimTypes.Id, user.Id.ToString()),
                new Claim(JwtClaimTypes.Email, user.Email),
                new Claim(JwtClaimTypes.GivenName, user.FirstName),
                new Claim(JwtClaimTypes.FamilyName, user.LastName),
                new Claim("admin", IsUserAdmin(user), ClaimValueTypes.Boolean),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            return userClaims;
        }

        private string IsUserAdmin(User user)
        {
            List<string> admins = new List<string> { "peter.domonkos@visma.com", "dominik.kolesar@visma.com", "matej.vysokai@visma.com" };
            return admins.Contains(user.Email).ToString();
        }

    }
}
