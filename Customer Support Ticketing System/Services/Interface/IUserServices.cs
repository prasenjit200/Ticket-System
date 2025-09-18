using Customer_Support_Ticketing_System.Models;

namespace Customer_Support_Ticketing_System.Services.Interface
{
    public interface IUserServices
    {
        //user can add

        Task AddUer(UserModel user);
        Task<UserModel> FindByEmail(string id);
        Task<List<UserModel>> AllUsers();
        Task<string> FindNmeById(string id);
    }
}
