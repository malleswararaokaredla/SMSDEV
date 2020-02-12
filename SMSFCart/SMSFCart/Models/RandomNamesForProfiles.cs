using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace SMSFCart.Models
{
    public class RandomNamesForProfiles
    {
        public static string GetRandomString(int passwordLength)
        {
            string allowedChars = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789";
            char[] chars = new char[passwordLength];
            Random random = new Random();

            bool containsNum = false;
            do
            {
                for (int i = 0; i < passwordLength; i++)
                {
                    chars[i] = allowedChars[random.Next(0, allowedChars.Length)];
                    if (Char.IsDigit(chars[i]))
                    {
                        containsNum = true;
                    }
                }
            } while (!containsNum);

            return new string(chars);
        }

        public static string Encryptword(string Encryptval)

        {
            string key = "1prt56";

            byte[] SrctArray;

            byte[] EnctArray = UTF8Encoding.UTF8.GetBytes(Encryptval);

            SrctArray = UTF8Encoding.UTF8.GetBytes(key);

            TripleDESCryptoServiceProvider objt = new TripleDESCryptoServiceProvider();

            MD5CryptoServiceProvider objcrpt = new MD5CryptoServiceProvider();

            SrctArray = objcrpt.ComputeHash(UTF8Encoding.UTF8.GetBytes(key));

            objcrpt.Clear();

            objt.Key = SrctArray;

            objt.Mode = CipherMode.ECB;

            objt.Padding = PaddingMode.PKCS7;

            ICryptoTransform crptotrns = objt.CreateEncryptor();

            byte[] resArray = crptotrns.TransformFinalBlock(EnctArray, 0, EnctArray.Length);

            objt.Clear();

            return Convert.ToBase64String(resArray, 0, resArray.Length);

        }

    }
}
