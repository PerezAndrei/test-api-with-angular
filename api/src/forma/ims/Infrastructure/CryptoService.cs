using System;
using System.Security.Cryptography;
using System.Text;

namespace ims.Infrastructure
{
    public static class CryptoService
    {
        private const int SaltSize = 256 / 8;

        public static string CreateSalt()
        {
            //Generate a cryptographic random number.
            var rng = new RNGCryptoServiceProvider();
            var buff = new byte[SaltSize];
            rng.GetBytes(buff);

            // Return a Base64 string representation of the random number.
            return Convert.ToBase64String(buff);
        }

        public static string GetSHA1Hash(string password)
        {
            var algorithm = SHA1.Create();
            var data = algorithm.ComputeHash(Encoding.UTF8.GetBytes(password));
            var sh1 = "";
            for (var i = 0; i < data.Length; i++)
            {
                sh1 += data[i].ToString("x2").ToUpperInvariant();
            }
            return sh1;
        }

        public static bool AreHashesEqual(string hash1, string hash2)
        {
            return hash1.Equals(hash2, StringComparison.OrdinalIgnoreCase);
        }
    }
}