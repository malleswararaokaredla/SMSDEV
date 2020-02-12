using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using SMSFCart.BOL;
using SMSFCart.DAL;


namespace SMSFCart.BLL
{
   public class EntryBs
    {
        EntryDb objEntityDb = new EntryDb();
        Defaultclass objCRT = new Defaultclass();
        

        public string Register(User user)
        {            
          return objEntityDb.Register(user);            
        }

        public DataSet Login(User user)
        {
     // return objCRT.ConvertDStoBO(objEntityDb.Login(user));

       return objEntityDb.Login(user); 
        }        
    }

}
