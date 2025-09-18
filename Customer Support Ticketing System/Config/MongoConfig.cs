namespace Customer_Support_Ticketing_System.Config
{
    public class MongoConfig
    {

        public string ConnectingUrl { get; set; }

        public string DataBaseName { get; set; }
        public string UserCollection { get; set; }

        public string TicketCollection { get; set; }
        public string CommentCollection { get; set; }
    }
}