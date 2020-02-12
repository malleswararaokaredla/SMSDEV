using System;
using System.Collections.Generic;
using System.Text;

namespace SMSFCart.BOL
{
    public partial class Products_SubCategory
    {
        public int prod_subcat_id { get; set; }
        public string pscName { get; set; }        
        public int prod_cat_id { get; set; }
        public int IsActive { get; set; }
    }
}
