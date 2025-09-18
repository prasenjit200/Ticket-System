using Customer_Support_Ticketing_System.Config;
using Customer_Support_Ticketing_System.Models;
using Customer_Support_Ticketing_System.Services.Interface;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

public class MessageService : IMessageService
{
    private readonly IMongoCollection<CommentModel> _messageCollection;

    public MessageService(IOptions<MongoConfig> options)
    {
        var client = new MongoClient(options.Value.ConnectingUrl);
        var database = client.GetDatabase(options.Value.DataBaseName);
        _messageCollection = database.GetCollection<CommentModel>(options.Value.CommentCollection);
    }

    public async Task<CommentModel> AddMessageAsync(CommentModel message)
    {
        if (message is null)
            throw new ArgumentNullException(nameof(message), "Message cannot be null.");
        if (string.IsNullOrEmpty(message.TicketId))
            throw new ArgumentException("TicketId cannot be null or empty.", nameof(message.TicketId));
        if (string.IsNullOrEmpty(message.Content))
            throw new ArgumentException("Message content cannot be null or empty.", nameof(message.Content));

        await _messageCollection.InsertOneAsync(message);
        return message;
    }
    public async Task<List<CommentModel>> GetMessagesByTicketIdAsync(string ticketId)
    {
        return await _messageCollection.Aggregate().Match(u => u.TicketId == ticketId).ToListAsync(); 
    }

    public async Task<bool> DeleteMessageAsync(string messageId)
    {
        var filter = Builders<CommentModel>.Filter.Eq(m => m.Id, messageId);
        var result = await _messageCollection.DeleteOneAsync(filter);
        return result.DeletedCount > 0;
    }
}
