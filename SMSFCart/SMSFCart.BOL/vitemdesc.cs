using System;
using System.Collections.Generic;
using System.Text;

namespace SMSFCart.BOL
{
    public class Vitemdesc
    {
        public int itm_id { get; set; }
        public int bid { get; set; }
        public string itm_descp { get; set; }
        public string color { get; set; }
        public float price { get; set; }
        public int quantity { get; set; }

        
        //public int items_sid { get; set; }
        public int itm_wtid { get; set; }
        public int shipping_charges { get; set; }
        public int itm_length { get; set; }
        public string care { get; set; }
        public int waranty { get; set; }
        public int offer { get; set; }
        public string occasion { get; set; }
        public string features { get; set; }
        public string itm_size { get; set; }
        public int sleeve_Length { get; set; }
        public string attached_sleeves { get; set; }

        public string sleeves_material { get; set; }
        
       
        public string product_code { get; set; }
        
        public int item_mid { get; set; }
        public int itm_sz_id { get; set; }
       
        
       
        public string itm_style_type { get; set; }

        public string heel_height { get; set; }
        public string toe_type { get; set; }
        public string heel_type { get; set; }

        public string model_no { get; set; }
     
        public string neck_type { get; set; }
        public string material_type { get; set; }
        public string Bname { get; set; }
        public string it_name { get; set; }
        //public int no_of_pcs { get; set; }
        //public string transparency { get; set; }

        public string worktype { get; set; }

    }
}
