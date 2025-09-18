using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Customer_Support_Ticketing_System.Models
{
    public class UserModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string FirstNamem { get; set; }0
        public string LastName { get; set; }

        public string Email { get; set; }
        public string PasswordHash { get; set; }
    }
}
