using System;
using System.Collections.Generic;
using System.Text;

namespace SMSFCart.BOL
{
   public class orders
    {
        public int ord_id { get; set; }
        public int aid { get; set; }
        public int uid { get; set; }
        public string phone { get; set; }
        public string itm_id { get; set; }
        public string ord_date { get; set; }
        public string ord_status { get; set; }
        public string payment_mode { get; set; }
        public string expe_dvy_date { get; set; }
        public string actl_dvy { get; set; }
        public int amount { get; set; }
        public int shipping_charges { get; set; }
        public int Total_amount { get; set; }
        public string cardno { get; set; }
        public string cardname { get; set; }
        public int expmonth { get; set; }
        public int expyear { get; set; }
        public int cvv { get; set; }
    }
}
