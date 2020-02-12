using System;
using System.Collections.Generic;
using System.Text;

namespace SMSFCart.BOL
{
   public class AddressModel
    {
        public int AID { get; set; }
        public int UID { get; set; }
        public string Address { get; set; }
        public string Town { get; set; }
        public string City { get; set; }
        public int Pincode { get; set; }
        public string State { get; set; }
        public string Type { get; set; }
        public string avaldays { get; set; }
        public string Time { get; set; }

    }
}
