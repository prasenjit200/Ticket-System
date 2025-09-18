using Customer_Support_Ticketing_System.Models;
using System.Text.Json.Serialization;

namespace Customer_Support_Ticketing_System.Dtos
{
    public class TicketStatusUpdateDto
    {
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public TicketStatus Status { get; set; }
    }
}