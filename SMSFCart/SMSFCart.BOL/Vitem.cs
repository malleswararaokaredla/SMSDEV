using System;
using System.Collections.Generic;
using System.Text;

namespace SMSFCart.BOL
{
    public class Vitem
    {
        public string itemname { get; set; }
         public int PID { get; set; }
         public int prod_cat_id { get; set; }
         public int prod_subcat_id { get; set; }
        public int itm_id { get; set; }
         public string cat_img { get; set; }
        public int vendorid { get; set; }
        public string imgname { get; set; }
        public string pscName { get; set; }
        public string pcName { get; set; }
        public string PName { get; set; }

        public string catlog_img { get; set; }
        public string catimgname { get; set; }
    }
}
