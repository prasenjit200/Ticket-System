using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace Customer_Support_Ticketing_System.Models
{
    public class TicketModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string? UserId { get; set; }

        public string Title { get; set; }

        [BsonElement("description")]
        public string Description { get; set; }

        [BsonRepresentation(BsonType.String)]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public PriorityLevel? Priority { get; set; }

        [BsonRepresentation(BsonType.String)]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public TicketStatus? Status { get; set; } = TicketStatus.Open;

        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
