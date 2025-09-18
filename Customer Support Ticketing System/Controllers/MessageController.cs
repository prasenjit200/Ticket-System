using Customer_Support_Ticketing_System.Models;
using Customer_Support_Ticketing_System.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;


[Route("api/[controller]")]
[ApiController]
[Authorize]
public class MessageController : ControllerBase
{
    private readonly IMessageService _messageService;

    public MessageController(IMessageService messageService)
    {
        _messageService = messageService;
    }
    [HttpPost]
    public async Task<IActionResult> AddMessage([FromBody] CommentModel message)
    {
        try
        {
            var createdMessage = await _messageService.AddMessageAsync(message);
            return Ok(createdMessage);
        }
        catch (ArgumentNullException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("{ticketId}")]
    public async Task<IActionResult> GetMessages(string ticketId)
    {
        try
        {
            var messages = await _messageService.GetMessagesByTicketIdAsync(ticketId);
            return Ok(messages);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpDelete("{messageId}")]
    public async Task<IActionResult> DeleteMessage(string messageId)
    {
        var success = await _messageService.DeleteMessageAsync(messageId);

        if (!success)
        {
            return NotFound("Message not found.");
        }

        return NoContent();
    }
}