using Customer_Support_Ticketing_System.Config;
using Customer_Support_Ticketing_System.Models;
using Customer_Support_Ticketing_System.Services.Interface;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Customer_Support_Ticketing_System.Services.Implementation
{
    public class UserServices:IUserServices
    {
        private readonly IMongoCollection<UserModel> _usercollection; 
       public UserServices(IOptions<MongoConfig> options)
        {
            var client = new MongoClient(options.Value.ConnectingUrl);
            var DataBase = client.GetDatabase(options.Value.DataBaseName);
            _usercollection = DataBase.GetCollection<UserModel>(options.Value.UserCollection); 
        }

        public async Task AddUer(UserModel user)
        {

            await _usercollection.InsertOneAsync(user);
            
        }
        public async Task<List<UserModel>> AllUsers()
        {
            try
            {
                var users =  await _usercollection.Find(_ => true).ToListAsync();
                return users;
            }catch(Exception ex)

            {
                throw new Exception($"new error occur {ex}"); 
            }
        }

        public async Task<UserModel>FindByEmail (string email)
        {
            try
            {
                return await _usercollection.Find(u => u.Email == email).FirstOrDefaultAsync();
            }catch(Exception ex)
            {
                throw new Exception($"new error occur {ex}"); 
            }
        }
        public async Task<string> FindNmeById(string id)
        {
            try
            {
                var user = await _usercollection.Find(u => u.Id == id).FirstOrDefaultAsync();
                if (user != null)
                {
                    return $"{user.FirstNamem} {user.LastName}";

                }
                return null; // or throw exception if preferred
            }
            catch (Exception ex)
            {
                throw new Exception($"Error occurred while finding user by id: {ex.Message}");
            }
        }

        


    }
}