using Customer_Support_Ticketing_System.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface IMessageService
{
    Task<CommentModel> AddMessageAsync(CommentModel message);
    Task<List<CommentModel>> GetMessagesByTicketIdAsync(string ticketId);
     Task<bool> DeleteMessageAsync(string messageId); 
}
