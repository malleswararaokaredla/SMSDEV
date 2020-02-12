using System;
using System.Collections.Generic;
using System.Text;

namespace SMSFCart.BOL
{
   public class Item
    {
        public int uid { get; set; }
        public int itm_id { get; set; }
        public string cat_img { get; set; }
        public string it_name { get; set; }
        public int price { get; set; }
        public string size { get; set; }
        public int qunty { get; set; }

        public int type { get; set; }
        public int bag_id { get; set; }
        public string status { get; set; }
    }
}
