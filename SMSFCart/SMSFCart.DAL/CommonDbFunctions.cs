using SMSFCart.BOL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Reflection;
using System.Text;

namespace SMSFCart.DAL
{
    public class CommonDbFunctions
    {
       static string ErrorMessage;
        static SqlCommand CmdCAP;
       static DBConnection db = new DBConnection();
        static SqlConnection ConCAP;

        static SqlDataAdapter DaCAP;
        static DataSet DsCAP;
        static DataTable dt;

        static Defaultclass dc = new Defaultclass();
     
        static User objuser = new User();
        static int rowcount = 0;
        public static SqlParameter AddParameter(string paramName, SqlDbType dbType, int paramSize, object paramValue)
        {

            SqlParameter param = new SqlParameter();
            param.ParameterName = paramName;
            param.SqlDbType = dbType;
            if (paramSize > 0)
                param.Size = paramSize;
            param.Value = paramValue;

            return param;
           // CmdCAP.Parameters.Add(param);


        }

        public static string SqlCommandExecution(CommandType cmdType, string CommandText,SqlCommand CmdCAPp)
        {
            ErrorMessage = "";

            CmdCAP = CmdCAPp;
            string str = db.Sconnection();
            try
            {
                using (ConCAP = new SqlConnection(str))
                {
                    //try
                    //{
                    CmdCAP.CommandType = cmdType;
                    CmdCAP.CommandText = CommandText;
                    CmdCAP.Connection = ConCAP;
                    ConCAP.Open();
                    //tranCAP = ConCAP.BeginTransaction();
                    //CmdCAP.Transaction = tranCAP;
                    CmdCAP.ExecuteNonQuery();
                    //  tranCAP.Commit();
                    //}
                    //catch (Exception ex)
                    //{
                    //    if (tranCAP != null)
                    //        tranCAP.Rollback();
                    //    ErrorMessage =ex.Message;
                    //}
                }
            }
            catch (SqlException sqlex)
            {
                //DisplayCustomError(sqlex);
                ErrorMessage = sqlex.Message;
            }
            catch (Exception ex)
            {
                ErrorMessage = ex.Message;
                //GLOBAL_ERROR_STRING = ex.Message;
            }
            return ErrorMessage;
        }


        public static DataSet FillDataSet(string CommandText,SqlCommand CmdCAPp)
        {
            ErrorMessage = "";
            CmdCAP = CmdCAPp;

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
                    //DisplayCustomError(sqlex);
                    ErrorMessage = sqlex.Message;
                }
                catch (Exception ex)
                {
                    ErrorMessage = ex.Message;
                }
            }
            return DsCAP;
        }


        public static DataTable SetToDataTable(SqlCommand cmd)
        {
            CmdCAP = cmd;
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
                    //DisplayCustomError(sqlex);
                    ErrorMessage = sqlex.Message;
                }
                catch (Exception ex)
                {
                    ErrorMessage = ex.Message;
                }
            }
            return dt;

        }

        public static User ConvertDStoBO(DataSet ds)
        {
            try
            {
                if (ds.Tables[0] != null)
                {
                    objuser.UID = Int32.Parse(ds.Tables[0].Rows[0][0].ToString());
                    objuser.FirstName = ds.Tables[0].Rows[0][1].ToString();
                    objuser.LastName = ds.Tables[0].Rows[0][2].ToString();
                    objuser.Email = ds.Tables[0].Rows[0][3].ToString();
                    objuser.Password = ds.Tables[0].Rows[0][4].ToString();
                    objuser.PhoneNo = ds.Tables[0].Rows[0][5].ToString();
                    objuser.Gender = ds.Tables[0].Rows[0][6].ToString();
                    objuser.OTP = Int32.Parse(ds.Tables[0].Rows[0][7].ToString());
                    objuser.Image = ds.Tables[0].Rows[0][8].ToString();


                    objuser.RoleID = Int32.Parse(ds.Tables[0].Rows[0][9].ToString());
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

        public static List<User> ConvertDStolist(DataSet ds)
        {
            List<User> list = new List<User>();
            try
            {
                if (ds.Tables[0] != null)
                {
                    rowcount = ds.Tables[0].Rows.Count;
                    for (int i = 0; i < rowcount; i++)
                    {
                        User u = new User();
                        u.UID = Int32.Parse(ds.Tables[0].Rows[i]["UID"].ToString());
                        u.name = ds.Tables[0].Rows[i]["name"].ToString();
                        u.Email = ds.Tables[0].Rows[i]["Email"].ToString();
                        u.Image = ds.Tables[0].Rows[i]["Image"].ToString();

                        u.VID = Int32.Parse(ds.Tables[0].Rows[i]["Vid"].ToString());
                        u.prod_subcat_id = Int32.Parse(ds.Tables[0].Rows[i]["prod_subcat_id"].ToString());
                        u.prod_cat_id = Int32.Parse(ds.Tables[0].Rows[i]["prod_cat_id"].ToString());
                        u.PID = Int32.Parse(ds.Tables[0].Rows[i]["PID"].ToString());


                        u.pscname = ds.Tables[0].Rows[i]["pscname"].ToString();
                        u.pcName = ds.Tables[0].Rows[i]["pcName"].ToString();
                        u.PName = ds.Tables[0].Rows[i]["PName"].ToString();

                        u.RoleID = Int32.Parse(ds.Tables[0].Rows[i]["RoleID"].ToString());
                        u.Vpid = Int32.Parse(ds.Tables[0].Rows[i]["Vpid"].ToString());
                        list.Add(u);
                    }
                }
                else
                {
                    list = null;
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

            return list;
        }

        public static List<Vitem>convertitemstolist(DataSet ds)
        {
            List<Vitem> list = new List<Vitem>();
            try
            {
                if (ds.Tables[0] != null)
                {
                    rowcount = ds.Tables[0].Rows.Count;
                    for (int i = 0; i < rowcount; i++)
                    {
                        Vitem u = new Vitem();
                        u.itm_id = Int32.Parse(ds.Tables[0].Rows[i]["itm_id"].ToString());
                        u.itemname = ds.Tables[0].Rows[i]["it_name"].ToString();
                        u.cat_img = ds.Tables[0].Rows[i]["cat_img"].ToString();
                        u.pscName = ds.Tables[0].Rows[i]["pscName"].ToString();

                        //u.prod_subcat_id = Int32.Parse(ds.Tables[0].Rows[i]["prod_subcat_id"].ToString());
                        //u.prod_cat_id = Int32.Parse(ds.Tables[0].Rows[i]["prod_cat_id"].ToString());
                        //u.PID = Int32.Parse(ds.Tables[0].Rows[i]["PID"].ToString());


                       
                        u.pcName = ds.Tables[0].Rows[i]["pcName"].ToString();
                        u.PName = ds.Tables[0].Rows[i]["PName"].ToString();

                      
                        list.Add(u);
                    }
                }
                else
                {
                    list = null;
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

            return list;
        }

        public static List<AddressModel> ConvertAddressDStoBO(DataSet ds)
        {
            
            List<AddressModel> list = new List<AddressModel>();
            try
            {
                if (ds.Tables[0] != null)
                {
                    rowcount = ds.Tables[0].Rows.Count;
                    for(int i=0;i<rowcount;i++)
                    {

                        AddressModel m = new AddressModel();

                        m.AID = Int32.Parse(ds.Tables[0].Rows[i][0].ToString());
                        m.UID= Int32.Parse(ds.Tables[0].Rows[i][1].ToString());
                        m.Address = ds.Tables[0].Rows[i][2].ToString();
                        m.Town = ds.Tables[0].Rows[i][3].ToString();
                        m.City = ds.Tables[0].Rows[i][4].ToString();
                        m.Pincode =Convert.ToInt32(ds.Tables[0].Rows[i][5].ToString());
                        m.State = ds.Tables[0].Rows[i][6].ToString();
                        m.Type = ds.Tables[0].Rows[i][7].ToString();
                        m.avaldays = ds.Tables[0].Rows[i][8].ToString();
                        m.Time = ds.Tables[0].Rows[i][9].ToString();
                        list.Add(m);
                    }
                }
                else
                {
                    list = null;
                }
            }
            catch (EvaluateException ex)
            {
                Console.WriteLine(ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return list;
        }

        private static List<T> ConvertDataTable<T>(DataTable dt)
        {
            List<T> data = new List<T>();
            foreach (DataRow row in dt.Rows)
            {
                T item = GetItem<T>(row);
                data.Add(item);
            }
            return data;
        }
        private static T GetItem<T>(DataRow dr)
        {
            Type temp = typeof(T);
            T obj = Activator.CreateInstance<T>();

            foreach (DataColumn column in dr.Table.Columns)
            {
                foreach (PropertyInfo pro in temp.GetProperties())
                {
                    if (pro.Name == column.ColumnName)
                        pro.SetValue(obj, dr[column.ColumnName], null);
                    else
                        continue;
                }
            }
            return obj;
        }
    }
}
