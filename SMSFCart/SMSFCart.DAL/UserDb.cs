using SMSFCart.BOL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.Text;

namespace SMSFCart.DAL
{
   public class UserDb:DBConnection
    {
        DBConnection db = new DBConnection();
      ///*  SqlConnection ConCAP*/;
        SqlCommand CmdCAP;
        //SqlDataAdapter DaCAP;
        DataSet DsCAP;
        //DataTable dt;
        string ErrorMessage;
        //SqlTransaction tranCAP;
        Defaultclass dc = new Defaultclass();
        User objuser = new User();


        public User GetUserDataById(int id)
        {

            CmdCAP = new SqlCommand();
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@UID", SqlDbType.Int, 100, id));

            DsCAP = CommonDbFunctions.FillDataSet("spGetAllUserDetailsByID", CmdCAP);


            return CommonDbFunctions.ConvertDStoBO(DsCAP);
        }

        public string UpdateUserPersonalData(User user)
        {

            CmdCAP = new SqlCommand();

            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@UID", SqlDbType.Int, 100, user.UID));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Firstname", SqlDbType.VarChar, 100, string.IsNullOrEmpty(user.FirstName) ? SqlString.Null : user.FirstName));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@LastName", SqlDbType.VarChar, 100, string.IsNullOrEmpty(user.LastName) ? SqlString.Null : user.LastName));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Email", SqlDbType.VarChar, 100, string.IsNullOrEmpty(user.Email) ? SqlString.Null : user.Email));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@PhoneNo", SqlDbType.VarChar, 100, string.IsNullOrEmpty(user.PhoneNo) ? SqlString.Null : user.PhoneNo));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Gender", SqlDbType.VarChar, 10, string.IsNullOrEmpty(user.Gender) ? SqlString.Null : user.Gender));


            ErrorMessage = CommonDbFunctions.SqlCommandExecution(CommandType.StoredProcedure, "UpdateUserDataById", CmdCAP);
            return ErrorMessage;


        }

        public string UpdatePassword(int id,string password)
        {
            CmdCAP = new SqlCommand();

            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@UID", SqlDbType.Int, 100, id));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Password", SqlDbType.VarChar, 100, string.IsNullOrEmpty(password) ? SqlString.Null : password));
           

            ErrorMessage = CommonDbFunctions.SqlCommandExecution(CommandType.StoredProcedure, "UpdatePassword", CmdCAP);
            return ErrorMessage;
        }

        public string UpdateProfilePic(int id,string imagepath)
        {
            
                CmdCAP = new SqlCommand();

            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@UID", SqlDbType.Int, 100, id));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Image", SqlDbType.VarChar, 200, string.IsNullOrEmpty(imagepath) ? SqlString.Null : imagepath));


            ErrorMessage = CommonDbFunctions.SqlCommandExecution(CommandType.StoredProcedure, "updateprofilephoto", CmdCAP);
            return ErrorMessage;
        }

        //sudha created on 19/12
        public DataSet GetAllUsers()
        {
            CmdCAP = new SqlCommand();

            DsCAP = CommonDbFunctions.FillDataSet("spGetAllUsersList", CmdCAP);

            return DsCAP;

        }

    }
}
