using SMSFCart.BOL;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;

namespace SMSFCart.DAL
{
    public class EntryDb: DBConnection
    {

    DBConnection db = new DBConnection();
    SqlConnection ConCAP;
    SqlCommand CmdCAP;
    SqlDataAdapter DaCAP;
    DataSet DsCAP;
    DataTable dt;
    string ErrorMessage;
    //SqlTransaction tranCAP;
    Defaultclass dc = new Defaultclass();
    User objuser = new User();

    //public int Register(User user)
    //    {
    //        SqlCommand sqlcommand = new SqlCommand();

    //        SqlParameter[] param = new SqlParameter[10];
    //        param[0] = new SqlParameter("@Firstname", user.FirstName);
    //        param[1] = new SqlParameter("@LastName", user.LastName);
    //        param[2] = new SqlParameter("@Email", user.Email);
    //        param[3] = new SqlParameter("@PhoneNo", user.PhoneNo);
    //        param[4] = new SqlParameter("@Gender", user.Gender);
    //        param[5] = new SqlParameter("@Address", user.Address);
    //        param[6] = new SqlParameter("@Password", user.Password);
    //        param[7] = new SqlParameter("@OTP", user.OTP);
    //        param[8] = new SqlParameter("@Image", user.Image);
    //        param[9] = new SqlParameter("@RoleID", user.RoleID);


    //        sqlcommand = new SqlCommand("spRegistration", OpenConnection())
    //        {
    //            CommandType = CommandType.StoredProcedure
    //        };
    //        sqlcommand.Parameters.AddRange(param);


    //        try
    //        {
    //            int irowsAffected = sqlcommand.ExecuteNonQuery();
    //            return irowsAffected;

    //        }
    //        catch (SqlException ex)
    //        {
    //            //handel sql excepetions
    //            Console.WriteLine(ex.Message + "  in UserDb StoreUser()");
    //            return 0;
    //        }
    //        catch (Exception ex)
    //        {
    //            //handel exceptions
    //            Console.WriteLine(ex.Message + "  in UserDb StoreUser()");
    //            return 0;
    //        }
    //        finally
    //        {
    //            CloseConnection();
    //        }            
    //    }

    public string Register(User user)
    {
      
      CmdCAP = new SqlCommand();
           

            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Firstname", SqlDbType.VarChar, 100, string.IsNullOrEmpty(user.FirstName) ? SqlString.Null : user.FirstName));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@LastName", SqlDbType.VarChar, 100, string.IsNullOrEmpty(user.LastName) ? SqlString.Null : user.LastName));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Email", SqlDbType.VarChar, 100, string.IsNullOrEmpty(user.Email) ? SqlString.Null : user.Email));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@PhoneNo", SqlDbType.VarChar, 100, string.IsNullOrEmpty(user.PhoneNo) ? SqlString.Null : user.PhoneNo));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Gender", SqlDbType.VarChar, 10, string.IsNullOrEmpty(user.Gender) ? SqlString.Null : user.Gender));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Password", SqlDbType.VarChar, 100, string.IsNullOrEmpty(user.Password) ? SqlString.Null : user.Password));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@OTP", SqlDbType.Int, 0, string.IsNullOrEmpty(user.OTP.ToString()) ? SqlInt32.Null : Convert.ToInt32(user.OTP)));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Image", SqlDbType.VarChar, 100, user.Image));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@RoleID", SqlDbType.Int, 0, user.RoleID));

            ErrorMessage = CommonDbFunctions.SqlCommandExecution(CommandType.StoredProcedure, "spRegistration", CmdCAP);
      return ErrorMessage;

            
        }

    /*public DataSet Login(User user)
        {
            SqlDataAdapter da;
            DataSet ds = new DataSet();

            SqlCommand sqlcommand = new SqlCommand();

            SqlParameter[] param = new SqlParameter[2];
            param[0] = new SqlParameter("@Email", user.Email);
            param[1] = new SqlParameter("@Password", user.Password);

            sqlcommand = new SqlCommand("spCheckUserLoginDetails", OpenConnection())
            {
                CommandType = CommandType.StoredProcedure
            };
            sqlcommand.Parameters.AddRange(param);

            try
            {
                da = new SqlDataAdapter(sqlcommand);
                da.Fill(ds);

            }
            catch (SqlException ex)
            {
                //handel sql excepetions
                Console.WriteLine(ex.Message + "  in UserDb StoreUser()");
            }
            catch (Exception ex)
            {
                //handel exceptions
                Console.WriteLine(ex.Message + "  in UserDb StoreUser()");
            }
            finally
            {
                CloseConnection();
            }
            return ds;
        }*/



    public DataSet Login(User user)
    {
      CmdCAP = new SqlCommand();
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Email",SqlDbType.VarChar,100, string.IsNullOrEmpty(user.Email) ? SqlString.Null : user.Email));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Password",SqlDbType.VarChar,100, string.IsNullOrEmpty(user.Password) ? SqlString.Null : user.Password));
            DsCAP= CommonDbFunctions.FillDataSet("spCheckUserLoginDetails", CmdCAP);
      return DsCAP;
    }




//   public bool CheckEmail(string Email)
//        {
//            string str = db.Sconnection();
//            bool res = false;
//            string email = "";

//            try
//            {
//                using (ConCAP = new SqlConnection(str))
//                {
//                    SqlCommand cmd = new SqlCommand("GetAllUsersData", OpenConnection());
//                    cmd.CommandType = CommandType.StoredProcedure;

//                    SqlDataReader dr = cmd.ExecuteReader();
//                    while (dr.Read())
//                    {
//                        email = dr["email"].ToString();

//                        if (email == Email)
//                        {
//                            res = true;
//                        }
//                    }
//                    dr.Close();
//                    return res;

//                }
//            }
//            catch(Exception ex)
//            {
//                Console.WriteLine(ex.Message);
//            }
//            return res;
//}




        //Sudha
        public DataSet AVLogin(string strEmail, string strPassword)
        {
            CmdCAP = new SqlCommand();
            AddParameter("@Email", SqlDbType.VarChar, 100, string.IsNullOrEmpty(strEmail) ? SqlString.Null : strEmail);
            AddParameter("@Password", SqlDbType.VarChar, 100, string.IsNullOrEmpty(strPassword) ? SqlString.Null : strPassword);
            FillDataSet("spCheckUserLoginDetails");
            return DsCAP;
        }

        public string taskloginstring (string strEmail, string strPassword)
        {
            CmdCAP = new SqlCommand();
           AddParameter("@Email", SqlDbType.VarChar, 100, string.IsNullOrEmpty(strEmail)? SqlString.Null : strEmail);
           AddParameter("@Password", SqlDbType.VarChar, 100, string.IsNullOrEmpty(strPassword)? SqlString.Null : strPassword);
            ErrorMessage = CommonDbFunctions.SqlCommandExecution(CommandType.StoredProcedure, "spCheckUserLoginDetails", CmdCAP);
            return ErrorMessage;
           
        }
    //sudha created on 28/12
    public bool CheckEmail(string strEmail)
        {
            Boolean res = false;
           
            try
            {
                CmdCAP = new SqlCommand();
                AddParameter("@Email", SqlDbType.VarChar, 50, string.IsNullOrEmpty(strEmail) ? SqlString.Null : strEmail);
                DsCAP = CommonDbFunctions.FillDataSet("spCheckEmail",CmdCAP);

                if(DsCAP.Tables[0].Rows.Count>0)
                {
                    res = true;
                }                
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);                
            }
            return res;
        }


        /***********************Defaultmethods*******************************/
        #region
        private void AddParameter(string paramName, SqlDbType dbType, int paramSize, object paramValue)
        {

            SqlParameter param = new SqlParameter();
            param.ParameterName = paramName;
            param.SqlDbType = dbType;
            if (paramSize > 0)
                param.Size = paramSize;
            param.Value = paramValue;
            CmdCAP.Parameters.Add(param);


        }
        private void SqlCommandExecution(CommandType cmdType, string CommandText)
        {
            ErrorMessage = "";
            string str = db.Sconnection();
            try
            {
                using (ConCAP = new SqlConnection(str))
                {

                    CmdCAP.CommandType = cmdType;
                    CmdCAP.CommandText = CommandText;
                    CmdCAP.Connection = ConCAP;
                    ConCAP.Open();
                    CmdCAP.ExecuteNonQuery();

                }
            }
            catch (SqlException sqlex)
            {
                ErrorMessage = sqlex.Message;
            }
            catch (Exception ex)
            {
                ErrorMessage = ex.Message;
            }
        }



        private void FillDataSet(string CommandText)
        {
            ErrorMessage = "";
            CmdCAP.CommandText = CommandText;
            CmdCAP.CommandType = CommandType.StoredProcedure;
            DaCAP = new SqlDataAdapter(CmdCAP);
            DsCAP = new DataSet();
            string str = db.Sconnection();
            using (ConCAP = new SqlConnection(str))
            {
                CmdCAP.Connection = ConCAP;
                try
                {
                    ConCAP.Open();
                    DaCAP.Fill(DsCAP);
                }
                catch (SqlException sqlex)
                {
                    ErrorMessage = sqlex.Message;
                }
                catch (Exception ex)
                {
                    ErrorMessage = ex.Message;
                }
            }
        }




        private void SetToDataTable()
        {
            ErrorMessage = "";
            string str = db.Sconnection();
            using (ConCAP = new SqlConnection(str))
            {

                CmdCAP.CommandType = CommandType.StoredProcedure;
                CmdCAP.CommandTimeout = 60;
                CmdCAP.Connection = ConCAP;
                DaCAP = new SqlDataAdapter(CmdCAP);
                ConCAP.Open();
                DsCAP = new DataSet();
                dt = new DataTable();
                try
                {
                    DaCAP.Fill(DsCAP);
                    if (DsCAP.Tables.Count > 0)
                        dt = DsCAP.Tables[0];

                }
                catch (SqlException sqlex)
                {
                    ErrorMessage = sqlex.Message;
                }
                catch (Exception ex)
                {
                    ErrorMessage = ex.Message;
                }
            }

        }


        public User ConvertDStoBO(DataSet ds)
        {
            try
            {
                if (ds.Tables[0] != null)
                {
                    objuser.UID = Int32.Parse(ds.Tables[0].Rows[0][0].ToString());
                    objuser.FirstName = ds.Tables[0].Rows[0][1].ToString();
                    objuser.LastName = ds.Tables[0].Rows[0][2].ToString();
                    objuser.Email = ds.Tables[0].Rows[0][3].ToString();
                    objuser.PhoneNo = ds.Tables[0].Rows[0][4].ToString();
                    objuser.Gender = ds.Tables[0].Rows[0][5].ToString();
                    objuser.Address = ds.Tables[0].Rows[0][6].ToString();
                    objuser.Password = ds.Tables[0].Rows[0][7].ToString();
                    objuser.OTP = Int32.Parse(ds.Tables[0].Rows[0][8].ToString());
                    objuser.Image = ds.Tables[0].Rows[0][9].ToString();
                    objuser.RoleID = Int32.Parse(ds.Tables[0].Rows[0][10].ToString());
                }
                else
                {
                    objuser = null;
                }
            }
            catch (EvaluateException ex)
            {
                //handel sql excepetions
                Console.WriteLine(ex.Message + "  in TypeConvert ConvertDStoBO()");
            }
            catch (Exception ex)
            {
                //handel exceptions
                Console.WriteLine(ex.Message + "  in TypeConvert ConvertDStoBO()");
            }

            return objuser;
        }
        #endregion
    }
}

        /***********************Defaultmethods*******************************/
        #region
        //    public void AddParameter(string paramName, SqlDbType dbType, int paramSize, object paramValue)
        //{

        //  SqlParameter param = new SqlParameter();
        //  param.ParameterName = paramName;
        //  param.SqlDbType = dbType;
        //  if (paramSize > 0)
        //    param.Size = paramSize;
        //  param.Value = paramValue;
        //  CmdCAP.Parameters.Add(param);


        //}
        //private void SqlCommandExecution(CommandType cmdType, string CommandText)
        //{
        //  ErrorMessage = "";
        //  string str = db.Sconnection();
        //  try
        //  {
        //    using (ConCAP = new SqlConnection(str))
        //    {

        //      CmdCAP.CommandType = cmdType;
        //      CmdCAP.CommandText = CommandText;
        //      CmdCAP.Connection = ConCAP;
        //      ConCAP.Open();

        //      CmdCAP.ExecuteNonQuery();

        //    }
        //  }
        //  catch (SqlException sqlex)
        //  {
        //    //DisplayCustomError(sqlex);
        //    ErrorMessage = sqlex.Message;
        //  }
        //  catch (Exception ex)
        //  {
        //    ErrorMessage = ex.Message;
        //    //GLOBAL_ERROR_STRING = ex.Message;
        //  }
        //}



        //private void FillDataSet(string CommandText)
        //{
        //  ErrorMessage = "";
        //  CmdCAP.CommandText = CommandText;
        //  CmdCAP.CommandType = CommandType.StoredProcedure;
        //  DaCAP = new SqlDataAdapter(CmdCAP);
        //  DsCAP = new DataSet();
        //  string str = db.Sconnection();
        //  using (ConCAP = new SqlConnection(str))
        //  {
        //    CmdCAP.Connection = ConCAP;
        //    try
        //    {
        //      ConCAP.Open();
        //      DaCAP.Fill(DsCAP);
        //    }
        //    catch (SqlException sqlex)
        //    {
        //      //DisplayCustomError(sqlex);
        //      ErrorMessage = sqlex.Message;
        //    }
        //    catch (Exception ex)
        //    {
        //      ErrorMessage = ex.Message;
        //    }
        //  }
        //}


        //private void SetToDataTable()
        //{
        //  ErrorMessage = "";
        //  string str = db.Sconnection();
        //  using (ConCAP = new SqlConnection(str))
        //  {

        //    CmdCAP.CommandType = CommandType.StoredProcedure;
        //    CmdCAP.CommandTimeout = 60;
        //    CmdCAP.Connection = ConCAP;
        //    DaCAP = new SqlDataAdapter(CmdCAP);
        //    ConCAP.Open();
        //    DsCAP = new DataSet();
        //    dt = new DataTable();
        //    try
        //    {
        //      DaCAP.Fill(DsCAP);
        //      if (DsCAP.Tables.Count > 0)
        //        dt = DsCAP.Tables[0];

        //    }
        //    catch (SqlException sqlex)
        //    {
        //      //DisplayCustomError(sqlex);
        //      ErrorMessage = sqlex.Message;
        //    }
        //    catch (Exception ex)
        //    {
        //      ErrorMessage = ex.Message;
        //    }
        //  }

        //}


        //public User ConvertDStoBO(DataSet ds)
        //{
        //  try
        //  {
        //    if (ds.Tables[0] != null)
        //    {
        //      objuser.UID = Int32.Parse(ds.Tables[0].Rows[0][0].ToString());
        //      objuser.FirstName = ds.Tables[0].Rows[0][1].ToString();
        //      objuser.LastName = ds.Tables[0].Rows[0][2].ToString();
        //      objuser.Email = ds.Tables[0].Rows[0][3].ToString();
        //      objuser.PhoneNo = ds.Tables[0].Rows[0][4].ToString();
        //      objuser.Gender = ds.Tables[0].Rows[0][5].ToString();
        //      objuser.Address = ds.Tables[0].Rows[0][6].ToString();
        //      objuser.Password = ds.Tables[0].Rows[0][7].ToString();
        //      objuser.OTP = Int32.Parse(ds.Tables[0].Rows[0][8].ToString());
        //      objuser.Image = ds.Tables[0].Rows[0][9].ToString();
        //      objuser.RoleID = Int32.Parse(ds.Tables[0].Rows[0][10].ToString());
        //    }
        //    else
        //    {
        //      objuser = null;
        //    }
        //  }
        //  catch (EvaluateException ex)
        //  {
        //    //handel sql excepetions
        //    Console.WriteLine(ex.Message + "  in TypeConvert ConvertDStoBO()");
        //  }
        //  catch (Exception ex)
        //  {
        //    //handel exceptions
        //    Console.WriteLine(ex.Message + "  in TypeConvert ConvertDStoBO()");
        //  }

        //  return objuser;
        //}
        #endregion
    

