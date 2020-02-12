using System;
using System.Collections.Generic;
using System.Text;

namespace SMSFCart.BOL
{
    public partial class Products_Category
    {
        public int prod_cat_id { get; set; }
        public string pcName { get; set; }
        public int PID { get; set; }
        public int IsActive { get; set; }
    }
}
 