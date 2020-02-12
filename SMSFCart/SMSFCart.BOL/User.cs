using System;

namespace SMSFCart.BOL
{
    public partial class User
    {        
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNo { get; set; }
        public string Gender { get; set; }      
        public string Address { get; set; }
        public string Password { get; set; }
        public int OTP { get; set; }
        public string Image { get; set; }
        public int RoleID { get; set; }
        public int UID { get; set; }


        //Vendor        
        public string pscname;
        public int VID { get; set; }
        public int PID { get; set; }
       
        public string Logo { get; set; }
        public string DOR { get; set; }
        public int IsActive { get; set; }


        public string PName { get; set; }
        public int prod_cat_id { get; set; }
        public int prod_subcat_id { get; set; }
        public string pcName { get; set; }
        public string name { get; set; }

        //mm
        public int Vpid { get; set; }


    }
}
