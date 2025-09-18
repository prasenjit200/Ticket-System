using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class CommentModel
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonRepresentation(BsonType.ObjectId)]
    public string? TicketId { get; set; }

    [BsonRepresentation(BsonType.ObjectId)]
    public string? UserId { get; set; }

    public string Content { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
