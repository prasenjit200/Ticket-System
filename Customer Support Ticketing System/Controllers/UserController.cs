using Customer_Support_Ticketing_System.Models;
using Customer_Support_Ticketing_System.Services.Implementation;
using Customer_Support_Ticketing_System.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Customer_Support_Ticketing_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class UserController : ControllerBase
    {

        private readonly IUserServices _userServices;

        public UserController(IUserServices userServices)
        {
            _userServices = userServices;
        }
        [HttpGet("name")]
        public IActionResult GetUserNameById()
        {

            var username = User.FindFirst(System.Security.Claims.ClaimTypes.Name)?.Value;

            return Ok(username); 


        }

        [HttpGet]
        public async Task<ActionResult<List<UserModel>>> GetAllusers()
        {

            var users = await _userServices.AllUsers();


            if(users == null)
            {
                return BadRequest("no user found !"); 
            }
            return Ok(users); 
        }

            [HttpGet("FindNameById/{id}")]
            public async Task<IActionResult> FindNameById(string id)
            {
                var name = await _userServices.FindNmeById(id);
                if (name != null)
                {
                    return Ok(new { name  });
                }
                return NotFound("User not found");
            }
        }

    }
