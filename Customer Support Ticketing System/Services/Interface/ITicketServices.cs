using Customer_Support_Ticketing_System.Models;

namespace Customer_Support_Ticketing_System.Services.Interface
{
    public interface ITicketServices
    {
        // api ->  1. add ticket 2 . find by id 3. Delete 4. Status update ...

        Task AddTicket(TicketModel ticket);

        Task<TicketModel> FindById(string Id);

        Task DeleteTicket(string id);
        //Task<bool> UpdateTicket(string ticketId, UpdateTicketModel request);
        Task<bool> UpdateTicketStatusAsync(string ticketId, TicketStatus newStatus); 

        Task<List<TicketModel>> AllTicket();
        Task<List<TicketModel>> FindAllUsersTicket(string id);

        Task<List<TicketModel>> FindTicketByUserid(string userId); 

    }
}
