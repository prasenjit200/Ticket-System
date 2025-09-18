using Customer_Support_Ticketing_System.Config;
using Customer_Support_Ticketing_System.Models;
using Customer_Support_Ticketing_System.Services.Interface;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

public class TicketService : ITicketServices
{
    private readonly IMongoCollection<TicketModel> _ticketCollection;
    public TicketService(IOptions<MongoConfig> options)
    {
        var client = new MongoClient(options.Value.ConnectingUrl);
        var database = client.GetDatabase(options.Value.DataBaseName);
        _ticketCollection = database.GetCollection<TicketModel>(options.Value.TicketCollection);
    }
    public async Task AddTicket(TicketModel ticket)
    {
        try
        {
            await _ticketCollection.InsertOneAsync(ticket);
        }
        catch (Exception ex)
        {
            throw new Exception("Something went wrong while adding ticket.", ex);
        }
    }

    public async Task<List<TicketModel>> FindAllUsersTicket(string id)
    {

        try
        {
            return await _ticketCollection.Aggregate<TicketModel>().Match(t => t.Id == id).ToListAsync(); 
        }catch(Exception ex)
        {
            throw new Exception($"internal server problem {ex}"); 
        }
    }

    public async Task<TicketModel> FindById(string id)
    {
        try
        {
            return await _ticketCollection.Find(t => t.Id == id).FirstOrDefaultAsync();
        }
        catch (Exception ex)
        {
            throw new Exception("Something went wrong while finding ticket.", ex);
        }
    }


    public async Task DeleteTicket(string id)
    {
        try
        {
            await _ticketCollection.DeleteOneAsync(t => t.Id == id);
        }
        catch (Exception ex)
        {
            throw new Exception("Something went wrong while deleting ticket.", ex);
        }
    }




    //public async Task<bool> UpdateTicket(string ticketId, UpdateTicketModel request)
    //{
    //    var filter = Builders<TicketModel>.Filter.Eq(t => t.Id, ticketId);
    //    var updateDefinitions = new List<UpdateDefinition<TicketModel>>();

    //    if (!string.IsNullOrEmpty(request.Title))
    //    {
    //        updateDefinitions.Add(Builders<TicketModel>.Update.Set(t => t.Title, request.Title));
    //    }

    //    if (!string.IsNullOrEmpty(request.Description))
    //    {
    //        updateDefinitions.Add(Builders<TicketModel>.Update.Set(t => t.Description, request.Description));
    //    }

    //    if (request.Priority.HasValue)
    //    {
    //        updateDefinitions.Add(Builders<TicketModel>.Update.Set(t => t.Priority, request.Priority.Value));
    //    }

    //    if (request.Status.HasValue)
    //    {
    //        updateDefinitions.Add(Builders<TicketModel>.Update.Set(t => t.Status, request.Status.Value));
    //    }

    //    if (!updateDefinitions.Any())
    //    {
    //        return false; 
    //    }

    //    var update = Builders<TicketModel>.Update.Combine(updateDefinitions);
    //    var result = await _ticketCollection.UpdateOneAsync(filter, update);

    //    return result.ModifiedCount > 0;
    //}



    public async Task<bool> UpdateTicketStatusAsync(string ticketId, TicketStatus newStatus)
    {
        var filter = Builders<TicketModel>.Filter.Eq(t => t.Id, ticketId);
        var update = Builders<TicketModel>.Update.Set(t => t.Status, newStatus);

        var result = await _ticketCollection.UpdateOneAsync(filter, update);

        return result.ModifiedCount > 0;
    }


    public async Task<List<TicketModel>> AllTicket()
    {
        try
        {
            return await _ticketCollection.Find(_ => true).ToListAsync();
        }
        catch (Exception ex)
        {
            return new List<TicketModel>();
        }
    }
    //public async Task<List<TicketModel>> AllTicket(int skip, int limit)
    //{
    //    return await _ticketCollection.Find(_ => true)
    //                                  .Skip(skip)
    //                                  .Limit(limit)
    //                                  .ToListAsync();
    //}


    public async Task<List<TicketModel>> FindTicketByUserid(string userId)
    {

        try
        {
            return await _ticketCollection.Aggregate().Match(t => t.UserId == userId).ToListAsync();
        }
        catch (Exception)
        {
            return new List<TicketModel>(); 
        }
    }

}

