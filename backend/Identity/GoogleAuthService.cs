using BookingApp.Common;
using BookingApp.Configuration;
using BookingApp.Database;
using BookingApp.Enums;
using BookingApp.Models;
using BookingApp.ViewModels;
using log4net;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using static Google.Apis.Auth.GoogleJsonWebSignature;

namespace BookingApp.Identity
{
    public class GoogleAuthService : IGoogleAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly GoogleAuthConfig _googleAuthConfig;
        private readonly ILog _logger;

        public GoogleAuthService(
            UserManager<User> userManager,
            ApplicationDbContext context,
            IOptions<GoogleAuthConfig> googleAuthConfig
            )
        {
            _userManager = userManager;
            _context = context;
            _googleAuthConfig = googleAuthConfig.Value;
            _logger = LogManager.GetLogger(typeof(GoogleAuthService));
        }

        public async Task<BaseResponse<User>> GoogleSignIn(GoogleSignInViewModel model)
        {

            Payload payload = new();

            try
            {
                payload = await ValidateAsync(model.IdToken, new ValidationSettings
                {
                    Audience = new[] { _googleAuthConfig.ClientId },
                    HostedDomain = _googleAuthConfig.HostedDomain
                });

            }
            catch (Exception ex)
            {
                _logger.Error(ex.Message, ex);
                return new BaseResponse<User>(null, new List<string> { "Failed to get a response." });
            }

            var userToBeCreated = new CreateUserFromSocialLogin
            {
                FirstName = payload.GivenName,
                LastName = payload.FamilyName,
                Email = payload.Email,
                ProfilePicture = payload.Picture,
                LoginProviderSubject = payload.Subject,
            };

            var user = await _userManager.CreateUserFromSocialLogin(_context, userToBeCreated, LoginProvider.Google);

            if (user is not null)
                return new BaseResponse<User>(user);

            else
                return new BaseResponse<User>(null, new List<string> { "Failed to get response." });
        }
    }
}
