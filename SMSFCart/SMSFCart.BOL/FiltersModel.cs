using System;
using System.Collections.Generic;
using System.Text;

namespace SMSFCart.BOL
{
   public class FiltersModel
    {
  
       
   
        public string bname { get; set; }
        public int minprice { get; set; }
        public int maxprice { get; set; }


        public int type { get; set; }
        public int prod_subcat_id { get; set; }
        public string name { get; set; }

    }
}
