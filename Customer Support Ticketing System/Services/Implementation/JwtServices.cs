using Customer_Support_Ticketing_System.Config;
using Customer_Support_Ticketing_System.Models;
using Customer_Support_Ticketing_System.Services.Interface;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Customer_Support_Ticketing_System.Services.Implementation
{
    public class JwtServices : IjwtServices
    {
        private readonly JwtConfig _jwtConfig;

        public JwtServices(IOptions<JwtConfig> jwtOptions)
        {
            _jwtConfig = jwtOptions.Value;
        }

        public string JwtGenerate(UserModel user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtConfig.SecretKey);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.FirstNamem), 
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(40),
                Issuer = _jwtConfig.Issuer,
                Audience = _jwtConfig.Audience,
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256
                )
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
