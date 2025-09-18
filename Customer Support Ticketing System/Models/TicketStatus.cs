using System.Text.Json.Serialization;

namespace Customer_Support_Ticketing_System.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum TicketStatus
    {
        Open,
        InProgress,
        Resolved
    }
}