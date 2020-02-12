using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SMSFCart.Models
{
    public class UserRegisterModel
    {
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public string password { get; set; }
        public string confirmpassword { get; set; }
        public string gender { get; set; }
       
    }
}
