﻿namespace Customer_Support_Ticketing_System.Config
{
    public class JwtConfig
    {
        public string SecretKey { get; set; } = null!;
        public string Issuer { get; set; } = null!;
        public string Audience { get; set; } = null!;
        public int ExpiresInMinutes { get; set; }
    }
}
