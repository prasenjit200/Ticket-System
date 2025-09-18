using Customer_Support_Ticketing_System.Models;
using Customer_Support_Ticketing_System.Services.Implementation;
using Customer_Support_Ticketing_System.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Customer_Support_Ticketing_System.Dtos;

namespace Customer_Support_Ticketing_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IjwtServices _jwt;
        private readonly IUserServices _userServices; 

        public AuthController(IjwtServices jwt , IUserServices userServices)
        {
            _jwt = jwt;
            _userServices = userServices;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Signup([FromBody] UserModel request)
        {
            try
            {
                if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.PasswordHash) || string.IsNullOrEmpty(request.FirstNamem))
                {
                    return BadRequest(new { message = "Email, password, and first name are required." });
                }

                request.Email = request.Email.ToLower();

                var existingUser = await _userServices.FindByEmail(request.Email);

                if (existingUser != null)
                {
                    return BadRequest(new { message = "User already exists." });
                }

                request.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.PasswordHash);

                await _userServices.AddUer(request);

                return Ok(new { message = "User created successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }


        [HttpPost("signin")]
        public async Task<IActionResult> Signin([FromBody] SigninDto request)
        {
            try
            {
                var existingUser = await _userServices.FindByEmail(request.Email);

                if (existingUser == null)
                {
                    return BadRequest(new { message = "Invalid email or password" });
                }

                bool isPasswordValid = BCrypt.Net.BCrypt.Verify(request.Password, existingUser.PasswordHash);

                if (!isPasswordValid)
                {
                    return BadRequest(new { message = "Invalid email or password" });
                }

                var token = _jwt.JwtGenerate(existingUser);

                return Ok(new
                {
                    message = "Login successful",
                    token = token,
                    user = new
                    {
                        existingUser.Id,
                        existingUser.Email,
                        existingUser.FirstNamem,
                        existingUser.LastName
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }


    }
}
