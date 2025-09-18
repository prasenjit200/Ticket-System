using Customer_Support_Ticketing_System.Models;

namespace Customer_Support_Ticketing_System.Services.Interface
{
    public interface IjwtServices
    {
        string JwtGenerate(UserModel user);
    }
}
