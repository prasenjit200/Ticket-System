using Customer_Support_Ticketing_System.Models;
using Customer_Support_Ticketing_System.Services.Implementation;
using Customer_Support_Ticketing_System.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Customer_Support_Ticketing_System.Dtos;
using Microsoft.AspNetCore.Authorization;

namespace Customer_Support_Ticketing_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class TicketController : ControllerBase
    {
        private readonly ITicketServices _ticketservice;
        public TicketController(ITicketServices ticketServices)
        {
            _ticketservice = ticketServices;
        }
        [HttpGet("all")]
        public async Task<ActionResult<List<TicketModel>>> GetAllTickets()
        {
            var tickets = await _ticketservice.AllTicket();
            if (tickets == null || tickets.Count == 0)
            {
                return NotFound("No tickets found...");
            }
            return Ok(tickets);
        }

        //[HttpGet("all")]
        //public async Task<ActionResult<List<TicketModel>>> GetAllTickets([FromQuery] int limit = 10, [FromQuery] int page = 1)
        //{
        //    var skip = (page - 1) * limit;

        //    var tickets = await _ticketservice.AllTicket(skip, limit);

        //    if (tickets == null || tickets.Count == 0)
        //    {
        //        return NotFound("No tickets found...");
        //    }
        //    return Ok(tickets);
        //}


        [HttpGet("users")]
        // here user only see there tickets -> 
        public async Task<ActionResult<List<TicketModel>>> GetAllUserTickets()
        {
            // get the user id by token -->

            try
            {
                var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("user id is not found in token ");
                }
                var tickets = await _ticketservice.FindAllUsersTicket(userId);

                return Ok(tickets);

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"internal server problem {ex}");

            }
        }

        [HttpPost]
        public async Task<IActionResult> AddTicket([FromBody] TicketModel ticket)
        {
            try
            {
                if (string.IsNullOrEmpty(ticket.Title) || string.IsNullOrEmpty(ticket.Description))
                {
                    return BadRequest("Ticket title and description are required.");
                }
                var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;


                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("User ID not found in token.");
                }
                ticket.UserId = userId;
                ticket.CreatedAt = DateTime.UtcNow;

                await _ticketservice.AddTicket(ticket);

                return Ok(new { msg = "Ticket created successfully", ticket });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while creating the ticket.");
            }
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteTask(string id)
        {
            try
            {
                // checking if the project is exist or not-> 
                var existingProject = await _ticketservice.FindById(id);

                if (existingProject == null)
                {
                    // if the project not found -> 
                    return NotFound("project not found in database ");
                }

                await _ticketservice.DeleteTicket(id);

                return Ok(new { msg = "project deleted successfully !!" });


            } catch (Exception ex)
            {
                return StatusCode(500, $"internal server error{ex}");
            }
        }

        //   search by ticket id ->

        [HttpGet("{id}")]

        public async Task<IActionResult> FindById(string id)
        {
            try
            {
                var ticket = await _ticketservice.FindById(id);


                if (ticket == null)
                {
                    return BadRequest($"ticket with id{id} not found in database");
                }

                return Ok(ticket);
            } catch (Exception ex)
            {
                return StatusCode(500, $"internal server error{ex}");
            }


        }


        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdateTicket(string id, [FromBody] UpdateTicketModel request)
        //{
        //    if (request == null)
        //    {
        //        return BadRequest(new { message = "Invalid request." });
        //    }

        //    var updated = await _ticketservice.UpdateTicket(id, request);

        //    if (!updated)
        //    {
        //        return NotFound(new { message = "Ticket not found or not updated." });
        //    }

        //    return Ok(new { message = "Ticket updated successfully." });
        //}




        [HttpPatch("{ticketId}/status")]
        public async Task<IActionResult> UpdateStatus(string ticketId, [FromBody] TicketStatusUpdateDto dto)
        {
            if (!Enum.IsDefined(typeof(TicketStatus), dto.Status))
            {
                return BadRequest("Invalid status value.");
            }

            var success = await _ticketservice.UpdateTicketStatusAsync(ticketId, dto.Status);


            if (!success)
            {
                return NotFound("Ticket not found or status unchanged.");
            }

            return Ok(new { message = "Status updated succesfully" });
        }
    

    [HttpGet("userticket/{userId}")]

        public async Task<ActionResult<List<TicketModel>>> FindTicketByUserId(string userId)
        {

            try
            {
                var tickets =await _ticketservice.FindTicketByUserid(userId);
                return Ok(tickets);
            }catch(Exception ex)
            {
                return BadRequest("no ticket found for this user "); 
            }
        }


    }
}

