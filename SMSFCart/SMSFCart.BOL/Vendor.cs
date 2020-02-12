using System;
using System.Collections.Generic;
using System.Text;

namespace SMSFCart.BOL
{
    public partial class Vendor
    {
        public int VID { get; set; }
        public string Logo { get; set; }
        public string PID { get; set; }
        public string DOR { get; set; }
        public int IsActive { get; set; }
    }
}
