using System;
using System.Collections.Generic;
using System.Text;
using SMSFCart.BOL;
using System.Data;
using System.Data.SqlClient;

namespace SMSFCart.DAL
{
    public class Defaultclass
    {
    //User objuser = new User();
    //SqlConnection ConCAP;
    //SqlCommand CmdCAP;
    //SqlDataAdapter DaCAP;
    //DataSet DsCAP;
    //DataTable dt;
    //string ErrorMessage;
    //SqlTransaction tranCAP;
    //DBConnection db = new DBConnection();
    //string ConStrng = "";

    /// <summary>
    /// This Methode is udet to conver DataSet to Object / Model
    /// </summary>
    /// <param name="ds"></param>
    /// <returns></returns>
    ///

    /***********************Defaultmethods*******************************/
    #region
    //private void AddParameter(string paramName, SqlDbType dbType, int paramSize, object paramValue)
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
    //      //try
    //      //{
    //      CmdCAP.CommandType = cmdType;
    //      CmdCAP.CommandText = CommandText;
    //      CmdCAP.Connection = ConCAP;
    //      ConCAP.Open();
    //      //tranCAP = ConCAP.BeginTransaction();
    //      //CmdCAP.Transaction = tranCAP;
    //      CmdCAP.ExecuteNonQuery();
    //      //  tranCAP.Commit();
    //      //}
    //      //catch (Exception ex)
    //      //{
    //      //    if (tranCAP != null)
    //      //        tranCAP.Rollback();
    //      //    ErrorMessage =ex.Message;
    //      //}
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
    //  using (ConCAP = new SqlConnection(this.ConStrng))
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
    
   

    #endregion
  }
}
