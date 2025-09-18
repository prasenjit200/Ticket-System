using Customer_Support_Ticketing_System.Models;

namespace Customer_Support_Ticketing_System.Models
{
    public class UpdateTicketModel
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public PriorityLevel? Priority { get; set; }
        public TicketStatus? Status { get; set; }
    }
}
