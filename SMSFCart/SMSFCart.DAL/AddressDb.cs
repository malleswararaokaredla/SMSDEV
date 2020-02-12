using SMSFCart.BOL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.Text;

namespace SMSFCart.DAL
{
  public class AddressDb
    {
        DBConnection db = new DBConnection();
    
        SqlCommand CmdCAP;
   
        DataSet DsCAP;
      
        string ErrorMessage;
     
        Defaultclass dc = new Defaultclass();
        //User objuser = new User();
        AddressModel addrs = new AddressModel();

        public List<AddressModel> GetUserAddressDataById(int id)
        {

            CmdCAP = new SqlCommand();
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@UID", SqlDbType.Int, 100, id));

            DsCAP = CommonDbFunctions.FillDataSet("GetAddressDetails", CmdCAP);


            return CommonDbFunctions.ConvertAddressDStoBO(DsCAP);
        }

        public string AddingAddressDetails(AddressModel model)
        {
            CmdCAP = new SqlCommand();

            //CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@AID", SqlDbType.Int, 100, string.IsNullOrEmpty(model.AID.ToString()) ? SqlInt32.Null : Convert.ToInt32(model.AID)));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@UID", SqlDbType.Int, 100, string.IsNullOrEmpty(model.UID.ToString()) ? SqlInt32.Null : Convert.ToInt32(model.UID)));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Address", SqlDbType.VarChar, 100, string.IsNullOrEmpty(model.Address) ? SqlString.Null : model.Address));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Town", SqlDbType.VarChar, 100, string.IsNullOrEmpty(model.Town) ? SqlString.Null : model.Town));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@City", SqlDbType.VarChar, 100, string.IsNullOrEmpty(model.City) ? SqlString.Null : model.City));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Pincode",SqlDbType.Int, 100, string.IsNullOrEmpty(model.Pincode.ToString()) ? SqlInt32.Null : Convert.ToInt32(model.Pincode)));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@State", SqlDbType.VarChar, 100, string.IsNullOrEmpty(model.State) ? SqlString.Null : model.State));          
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Type", SqlDbType.VarChar, 50, string.IsNullOrEmpty(model.Type) ? SqlString.Null : model.Type));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@avaldays", SqlDbType.VarChar, 100, string.IsNullOrEmpty(model.avaldays) ? SqlString.Null : model.avaldays));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Time", SqlDbType.VarChar, 50, model.Time));
                   
            ErrorMessage = CommonDbFunctions.SqlCommandExecution(CommandType.StoredProcedure, "Addaddress", CmdCAP);
            return ErrorMessage;
        }

        public string AddingAddressDetailsList(List<AddressModel> list)
        {

            string str = db.Sconnection();

            DataTable dt = new DataTable();
            dt.Columns.Add(new DataColumn("UID", typeof(Int32)));
            dt.Columns.Add(new DataColumn("Address", typeof(string)));
            dt.Columns.Add(new DataColumn("Town", typeof(string)));
            dt.Columns.Add(new DataColumn("City", typeof(string)));
            dt.Columns.Add(new DataColumn("Pincode", typeof(Int32)));
            dt.Columns.Add(new DataColumn("State", typeof(string)));
            dt.Columns.Add(new DataColumn("Type", typeof(string)));
            dt.Columns.Add(new DataColumn("avaldays", typeof(string)));
            dt.Columns.Add(new DataColumn("Time", typeof(string)));
           

            foreach (AddressModel model in list)
            {

                dt.Rows.Add(model.UID,model.Address,model.Town,model.City,model.Pincode,model.State,model.Type,model.avaldays,model.Time);

                //CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@UID", SqlDbType.Int, 100, string.IsNullOrEmpty(model.UID.ToString()) ? SqlInt32.Null : Convert.ToInt32(model.UID)));
                //CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Address", SqlDbType.VarChar, 100, string.IsNullOrEmpty(model.Address) ? SqlString.Null : model.Address));
                //CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Town", SqlDbType.VarChar, 100, string.IsNullOrEmpty(model.Town) ? SqlString.Null : model.Town));
                //CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@City", SqlDbType.VarChar, 100, string.IsNullOrEmpty(model.City) ? SqlString.Null : model.City));
                //CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Pincode", SqlDbType.Int, 100, string.IsNullOrEmpty(model.Pincode.ToString()) ? SqlInt32.Null : Convert.ToInt32(model.Pincode)));
                //CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@State", SqlDbType.VarChar, 100, string.IsNullOrEmpty(model.State) ? SqlString.Null : model.State));
                //CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Type", SqlDbType.VarChar, 50, string.IsNullOrEmpty(model.Type) ? SqlString.Null : model.Type));
                //CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@avaldays", SqlDbType.VarChar, 100, string.IsNullOrEmpty(model.avaldays) ? SqlString.Null : model.avaldays));
                //CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Time", SqlDbType.VarChar, 50, model.Time));

            }
            //CmdCAP = new SqlCommand();

            using (SqlConnection con = new SqlConnection(str))
            {

                SqlCommand sqlcom = new SqlCommand("AddingListOfAddress", con);
                sqlcom.CommandType = CommandType.StoredProcedure;
                sqlcom.Parameters.AddWithValue("@List", dt);
                // sqlcom.Parameters.Add(prmReturn);
                con.Open();
                sqlcom.ExecuteNonQuery();
            }
                

            return ErrorMessage;
        }

        public string UpdateAddressById(AddressModel model)
        {
            CmdCAP = new SqlCommand();

            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@AID", SqlDbType.Int, 100, string.IsNullOrEmpty(model.AID.ToString()) ? SqlInt32.Null : Convert.ToInt32(model.AID)));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@UID", SqlDbType.Int, 100, string.IsNullOrEmpty(model.UID.ToString()) ? SqlInt32.Null : Convert.ToInt32(model.UID)));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Address", SqlDbType.VarChar, 100, string.IsNullOrEmpty(model.Address) ? SqlString.Null : model.Address));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Town", SqlDbType.VarChar, 100, string.IsNullOrEmpty(model.Town) ? SqlString.Null : model.Town));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@City", SqlDbType.VarChar, 100, string.IsNullOrEmpty(model.City) ? SqlString.Null : model.City));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Pincode", SqlDbType.Int, 100, string.IsNullOrEmpty(model.Pincode.ToString()) ? SqlInt32.Null : Convert.ToInt32(model.Pincode)));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@State", SqlDbType.VarChar, 100, string.IsNullOrEmpty(model.State) ? SqlString.Null : model.State));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Type", SqlDbType.VarChar, 50, string.IsNullOrEmpty(model.Type) ? SqlString.Null : model.Type));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@avaldays", SqlDbType.VarChar, 100, string.IsNullOrEmpty(model.avaldays) ? SqlString.Null : model.avaldays));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Time", SqlDbType.VarChar, 50, model.Time));

            ErrorMessage = CommonDbFunctions.SqlCommandExecution(CommandType.StoredProcedure, "UpdateAddress", CmdCAP);
            return ErrorMessage;

        }

        public string DleteAddressById(int uid,int aid)
        {
            CmdCAP = new SqlCommand();

            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@AID", SqlDbType.Int, 100, string.IsNullOrEmpty(aid.ToString()) ? SqlInt32.Null : Convert.ToInt32(aid)));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@UID", SqlDbType.Int, 100, string.IsNullOrEmpty(uid.ToString()) ? SqlInt32.Null : Convert.ToInt32(uid)));
           
            ErrorMessage = CommonDbFunctions.SqlCommandExecution(CommandType.StoredProcedure, "DeleteAddress", CmdCAP);
            return ErrorMessage;
        }
    }
}
