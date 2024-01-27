using AutoMapper;
using BookingApp.Common;
using BookingApp.Interfaces;
using BookingApp.Models;
using BookingApp.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BookingApp.Controllers
{

    [ApiController]
    [Route("api/[controller]/[action]")]

    public class UserController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        public UserController(IMapper mapper, UserManager<User> userManager)
        {
            _mapper = mapper;
            _userManager = userManager;
        }

        [HttpGet]
        [ProducesResponseType(typeof(BaseResponse<List<UserViewModel>>), 200)]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var users = await _userManager.Users.ToListAsync();
                return ReturnResponse(new BaseResponse<List<UserViewModel>>(_mapper.Map<List<UserViewModel>>(users)));
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpGet]
        [ProducesResponseType(typeof(BaseResponse<UserViewModel>), 200)]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(id.ToString());
                if (user == null)
                {
                    return HandleError(new Exception("User not found"));
                }
                return ReturnResponse(new BaseResponse<UserViewModel>(_mapper.Map<UserViewModel>(user)));
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }
    }
}
