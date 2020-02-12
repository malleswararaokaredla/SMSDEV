using SMSFCart.BOL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.IO;
using System.Text;
using System.Web;
using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using System.Net.Http;
using Newtonsoft.Json.Linq;
using System.Collections;
using System.Linq;

namespace SMSFCart.DAL
{


    public class VendorDb : DBConnection
    {
        DBConnection db = new DBConnection();
        //private IHostingEnvironment _env;
        SqlConnection ConCAP;
        SqlCommand CmdCAP;
        //SqlDataAdapter DaCAP;
        DataSet DsCAP;
        DataTable dt;
        string ErrorMessage;
        SqlTransaction tranCAP;
        //Defaultclass dc = new Defaultclass();
        User objuser = new User();
       

        public int Vendorregister(User user)
        {
            string str = db.Sconnection();
            string ImageExt = "";
            string logoext = "";
            if (user.Image != null || user.Image != "")
            {
                string fname = user.Image;
                ImageExt = Path.GetExtension(fname);
            }
            if (user.Logo != null || user.Logo != "")
            {
                string logo = user.Logo;
                logoext = Path.GetExtension(logo);
            }





            int vid = 0;
            CmdCAP = new SqlCommand();

            //CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Imode", SqlDbType.VarChar, 100, "Insupd"));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Firstname", SqlDbType.VarChar, 100, string.IsNullOrEmpty(user.FirstName) ? SqlString.Null : user.FirstName));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@LastName", SqlDbType.VarChar, 100, string.IsNullOrEmpty(user.LastName) ? SqlString.Null : user.LastName));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Email", SqlDbType.VarChar, 100, string.IsNullOrEmpty(user.Email) ? SqlString.Null : user.Email));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@PhoneNo", SqlDbType.VarChar, 100, string.IsNullOrEmpty(user.PhoneNo) ? SqlString.Null : user.PhoneNo));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Gender", SqlDbType.VarChar, 10, string.IsNullOrEmpty(user.Gender) ? SqlString.Null : user.Gender));

            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Password", SqlDbType.VarChar, 100, string.IsNullOrEmpty(user.Password) ? SqlString.Null : user.Password));

            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Image", SqlDbType.VarChar, 100, ImageExt));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@RoleID", SqlDbType.Int, 0, user.RoleID));

            //CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@PID", SqlDbType.Int, 0, user.PID));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Logo", SqlDbType.VarChar, 100, logoext));

            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@IsActive", SqlDbType.Int, 0, user.IsActive));


            CmdCAP.CommandText = "Sp_vendorregistration";
            CmdCAP.CommandType = CommandType.StoredProcedure;

            using (ConCAP = new SqlConnection(str))
            {
                try
                {
                    ConCAP.Open();
                    tranCAP = ConCAP.BeginTransaction();
                    CmdCAP.Connection = ConCAP;
                    CmdCAP.Transaction = tranCAP;
                    CmdCAP.Parameters.Add("@id", SqlDbType.Int).Direction = ParameterDirection.Output;
                    //CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@id", SqlDbType.Int, 0, ParameterDirection.Output));
                    int i = CmdCAP.ExecuteNonQuery();

                    tranCAP.Commit();

                    vid = Convert.ToInt32(CmdCAP.Parameters["@id"].Value);


                }
                catch (Exception ex)
                {
                    ErrorMessage = ex.Message;
                    if (tranCAP != null)
                        tranCAP.Rollback();
                }
            }

            return vid;
        }

        public DataTable bindproduct()
        {
            CmdCAP = new SqlCommand();
            //CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Imode", SqlDbType.VarChar, 100, "select"));
            CmdCAP.CommandText = "sp_producttypes";
            CmdCAP.CommandType = CommandType.StoredProcedure;
            dt = CommonDbFunctions.SetToDataTable(CmdCAP);
            return dt;
        }


        public DataTable bindpcategories(int pid)
        {
            CmdCAP = new SqlCommand();
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@pid", SqlDbType.Int, 0, pid));
            CmdCAP.CommandText = "sp_Products_Category";
            CmdCAP.CommandType = CommandType.StoredProcedure;
            dt = CommonDbFunctions.SetToDataTable(CmdCAP);
            return dt;
        }

        public DataTable bindcategories()
        {
            CmdCAP = new SqlCommand();          
            CmdCAP.CommandText = "sp_category";
            CmdCAP.CommandType = CommandType.StoredProcedure;
            dt = CommonDbFunctions.SetToDataTable(CmdCAP);
            return dt;
        }

        public DataTable bindpscategories(int prod_cat_id)
        {
            CmdCAP = new SqlCommand();
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@prod_cat_id", SqlDbType.Int, 0, prod_cat_id));
           
            CmdCAP.CommandText = "sp_Products_Subcategory";
            CmdCAP.CommandType = CommandType.StoredProcedure;
            dt = CommonDbFunctions.SetToDataTable(CmdCAP);
            return dt;
        }


        public DataTable bindsubcatbyvid(int prod_cat_id, int vid)
        {
            CmdCAP = new SqlCommand();
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@prod_cat_id", SqlDbType.Int, 0, prod_cat_id));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@vid", SqlDbType.Int, 0, vid));
            CmdCAP.CommandText = "Sp_Products_Subcategorybyvid";
            CmdCAP.CommandType = CommandType.StoredProcedure;
            dt = CommonDbFunctions.SetToDataTable(CmdCAP);
            return dt;
        }

        public string inspname(string pname)
        {
           
            CmdCAP = new SqlCommand();

            //CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Imode", SqlDbType.VarChar, 50, "Insproud"));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@pname", SqlDbType.VarChar, 50, string.IsNullOrEmpty(pname) ? SqlString.Null : pname));
            CmdCAP.CommandText = "Sp_vendor";
            CmdCAP.CommandType = CommandType.StoredProcedure;

            using (ConCAP = new SqlConnection())
            {
                try
                {
                    ErrorMessage = CommonDbFunctions.SqlCommandExecution(CommandType.StoredProcedure, "Sp_vendor", CmdCAP);

                }
                catch (SqlException ex)
                {
                    ErrorMessage = ex.Message;
                }
            }
            return ErrorMessage;
        }

        public string vendoritemadding(int vid,string items)
        {

           
            CmdCAP = new SqlCommand();

            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@vid", SqlDbType.Int, 0, vid));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@prod_subcat_id", SqlDbType.VarChar, 1000, string.IsNullOrEmpty(items) ? SqlString.Null : items));
            using (ConCAP = new SqlConnection())
            {
                try
                {
                    ErrorMessage = CommonDbFunctions.SqlCommandExecution(CommandType.StoredProcedure, "sp_vendoritems", CmdCAP);

                }
                catch (SqlException ex)
                {
                    ErrorMessage = ex.Message;
                }
            }
          
            //DataTable dt = new DataTable();
            //dt.Columns.Add(new DataColumn("vid", typeof(Int32)));
            //dt.Columns.Add(new DataColumn("prod_subcat_id", typeof(Int32)));


            //foreach (product model in list)
            //{


            //    dt.Rows.Add(model.vid,model.prod_subcat_id);


            //}


            //using (SqlConnection con = new SqlConnection(str))
            //{

            //    SqlCommand sqlcom = new SqlCommand("sp_vendoritemlist", con);
            //    sqlcom.CommandType = CommandType.StoredProcedure;
            //    sqlcom.Parameters.AddWithValue("@List", dt);
            //    // sqlcom.Parameters.Add(prmReturn);
            //    con.Open();
            //    sqlcom.ExecuteNonQuery();
            //}


            return ErrorMessage;
        }


        public string AddingitemdesList(List<Vitemdesc> obj)
        {

            string str = db.Sconnection();
           

            //string[]strdesc = ((IEnumerable)obj).Cast<object>()
            //                     .Select(x => x.ToString())
            //                     .ToArray();

            DataTable dt = new DataTable();
            dt.Columns.Add(new DataColumn("itm_id", typeof(Int32)));
            dt.Columns.Add(new DataColumn("price", typeof(float)));
            dt.Columns.Add(new DataColumn("quantity", typeof(Int32)));
            dt.Columns.Add(new DataColumn("itm_length", typeof(Int32)));
            dt.Columns.Add(new DataColumn("color", typeof(string)));

            dt.Columns.Add(new DataColumn("itm_size", typeof(string)));
            
           
            //dt.Columns.Add(new DataColumn("itm_descp", typeof(string)));
            //dt.Columns.Add(new DataColumn("bid", typeof(Int32)));
            //dt.Columns.Add(new DataColumn("care", typeof(string)));         
            //dt.Columns.Add(new DataColumn("features", typeof(string)));
            //dt.Columns.Add(new DataColumn("heel_height", typeof(string))); 
            //dt.Columns.Add(new DataColumn("heel_type", typeof(string)));
            //dt.Columns.Add(new DataColumn("itm_sz_id", typeof(Int32)));

            //dt.Columns.Add(new DataColumn("attached_sleeves", typeof(string)));
            //dt.Columns.Add(new DataColumn("Sleeve_Length", typeof(string)));
            //dt.Columns.Add(new DataColumn("occasion", typeof(string)));
            //dt.Columns.Add(new DataColumn("item_mid", typeof(Int32)));
            //dt.Columns.Add(new DataColumn("neck_type", typeof(string)));
            //dt.Columns.Add(new DataColumn("sleeves_material", typeof(string)));
            //dt.Columns.Add(new DataColumn("itm_wtid", typeof(Int32)));


            //dt.Columns.Add(new DataColumn("product_code", typeof(string)));
            //dt.Columns.Add(new DataColumn("model_no", typeof(string)));

            //dt.Columns.Add(new DataColumn("shipping_charges", typeof(Int32)));
            //dt.Columns.Add(new DataColumn("offer", typeof(Int32)));


            //vitemdescJSON v = JsonConvert.DeserializeObject<vitemdescJSON>(obj);
            //var objs = JsonConvert.DeserializeObject<List<object>>(obj.ToString());
            //vitemdescJSON[] arr = JObject.Parse(obj.ToString())["vitemdescJSON"].ToObject<vitemdescJSON[]>();

            //foreach(string v in strdesc)
            //{
            //    dt.Rows.Add(v[0],v[1],v[2],v[3],v[4],v[6], v[7], v[8], v[9], v[10], v[11], v[12], v[13]);

            //}
            for (int i = 0; i < obj.Count; i++)
            {
                if (i != 0)
                {
                    dt.Rows.Add(obj[0].itm_id, obj[i].price, obj[i].quantity, obj[i].itm_length, obj[i].color, obj[i].itm_size);
                    //foreach (Vitemdesc v in obj)
                    //{

                    //    dt.Rows.Add(v.itm_id, v.price, v.color, v.itm_size, v.quantity, v.itm_length);
                    //}

                }
                
            }

            
            using (SqlConnection con = new SqlConnection(str))
            {
                try {
                    SqlCommand cmd = new SqlCommand("sp_vendoritemdesclist",con);
                    con.Open();
                    cmd.Parameters.AddWithValue("@itm_id", obj[0].itm_id);
                    cmd.Parameters.AddWithValue("@bid", obj[0].bid);
                    
                    cmd.Parameters.AddWithValue("@care", obj[0].care);
                    cmd.Parameters.AddWithValue("@features", obj[0].features);
                    cmd.Parameters.AddWithValue("@heel_height", obj[0].heel_height);
                    cmd.Parameters.AddWithValue("@heel_type", obj[0].heel_type);
                    cmd.Parameters.AddWithValue("@attached_sleeves", obj[0].attached_sleeves);

                    cmd.Parameters.AddWithValue("@sleeve_Length", obj[0].sleeve_Length);
                    cmd.Parameters.AddWithValue("@occasion", obj[0].occasion);
                    cmd.Parameters.AddWithValue("@item_mid", obj[0].item_mid);
                    cmd.Parameters.AddWithValue("@neck_type", obj[0].neck_type);
                    cmd.Parameters.AddWithValue("@sleeves_material", obj[0].sleeves_material);
                    cmd.Parameters.AddWithValue("@itm_wtid", obj[0].itm_wtid);
                    cmd.Parameters.AddWithValue("@product_code", obj[0].product_code);
                    cmd.Parameters.AddWithValue("@model_no", obj[0].model_no);
                    cmd.Parameters.AddWithValue("@shipping_charges", obj[0].shipping_charges);
                    cmd.Parameters.AddWithValue("@offer", obj[0].offer);
                    cmd.Parameters.AddWithValue("@itm_descp", obj[0].itm_descp);
                    cmd.Parameters.AddWithValue("@List", dt);
                    
                    cmd.CommandText = "sp_vendoritemdesclist";
                    cmd.CommandType = CommandType.StoredProcedure;
                   
                    tranCAP = con.BeginTransaction();
                    cmd.Connection = con;
                    cmd.Transaction = tranCAP;
              
                //CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@id", SqlDbType.Int, 0, ParameterDirection.Output));
                  int i = cmd.ExecuteNonQuery();

                  tranCAP.Commit();

              
                // sqlcom.Parameters.Add(prmReturn);
               
              

                }
                catch (Exception ex)
                {
                    ErrorMessage = ex.Message;
                    if (tranCAP != null)
                        tranCAP.Rollback();
                }
            }


            return ErrorMessage;
        }

        public int additemcatlog(List<Vitem> vitem)
        {

            string str = db.Sconnection();

            int i = 0;


            CmdCAP = new SqlCommand();
            CmdCAP.Parameters.Clear();
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@vid", SqlDbType.Int, 0, vitem[0].vendorid));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@pscid", SqlDbType.Int, 0, vitem[0].prod_subcat_id));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@img", SqlDbType.VarChar, 1000, string.IsNullOrEmpty(vitem[0].imgname) ? SqlString.Null : vitem[0].imgname));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@it_name", SqlDbType.VarChar, 1000, string.IsNullOrEmpty(vitem[0].itemname) ? SqlString.Null : vitem[0].itemname));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@imgnames", SqlDbType.VarChar, 1000, string.IsNullOrEmpty(vitem[0].catimgname) ? SqlString.Null : vitem[0].catimgname));

            CmdCAP.CommandText = "sp_itemsadding";
            CmdCAP.CommandType = CommandType.StoredProcedure;

            using (ConCAP = new SqlConnection(str))
            {
                try
                {
                    ConCAP.Open();
                    tranCAP = ConCAP.BeginTransaction();
                    CmdCAP.Connection = ConCAP;
                    CmdCAP.Transaction = tranCAP;
                    CmdCAP.Parameters.Add("@id", SqlDbType.Int).Direction = ParameterDirection.Output;
                    //CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@id", SqlDbType.Int, 0, ParameterDirection.Output));
                    int j = CmdCAP.ExecuteNonQuery();

                    tranCAP.Commit();

                    i = Convert.ToInt32(CmdCAP.Parameters["@id"].Value);


                }
                catch (Exception ex)
                {
                    ErrorMessage = ex.Message;
                    if (tranCAP != null)
                        tranCAP.Rollback();
                }
            }
            return i;
            
        }
        public int vitemadding(Vitem vitem)
        {
            string str = db.Sconnection();
            int i = 0;
            //string ImageExt = "";
            //if (vitem.cat_img != null || vitem.cat_img != "")
            //{
            //    string fname = vitem.imgname;
            //    ImageExt =Path.GetFileName(fname);
            //}

            CmdCAP = new SqlCommand();
            CmdCAP.Parameters.Clear();
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@vid", SqlDbType.Int, 0, vitem.vendorid));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@pscid", SqlDbType.Int, 0, vitem.prod_subcat_id));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@img", SqlDbType.VarChar,1000, string.IsNullOrEmpty(vitem.imgname) ? SqlString.Null : vitem.imgname));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@it_name", SqlDbType.VarChar, 1000, string.IsNullOrEmpty(vitem.itemname) ? SqlString.Null : vitem.itemname));
            //CmdCAP.Parameters.Add("@id", SqlDbType.Int).Direction = ParameterDirection.Output;
            //using (ConCAP = new SqlConnection())
            //{
            //    try
            //    {
            //        ErrorMessage = CommonDbFunctions.SqlCommandExecution(CommandType.StoredProcedure, "sp_itemsadding", CmdCAP);
            //        if(ErrorMessage=="")
            //        i= Convert.ToInt32(CmdCAP.Parameters["@id"].Value);

            //    }
            //    catch (SqlException ex)
            //    {
            //        ErrorMessage = ex.Message;
            //    }
            //}


            CmdCAP.CommandText = "sp_itemsadding";
            CmdCAP.CommandType = CommandType.StoredProcedure;

            using (ConCAP = new SqlConnection(str))
            {
                try
                {
                    ConCAP.Open();
                    tranCAP = ConCAP.BeginTransaction();
                    CmdCAP.Connection = ConCAP;
                    CmdCAP.Transaction = tranCAP;
                    CmdCAP.Parameters.Add("@id", SqlDbType.Int).Direction = ParameterDirection.Output;
                    //CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@id", SqlDbType.Int, 0, ParameterDirection.Output));
                    int j = CmdCAP.ExecuteNonQuery();

                    tranCAP.Commit();

                    i = Convert.ToInt32(CmdCAP.Parameters["@id"].Value);


                }
                catch (Exception ex)
                {
                    ErrorMessage = ex.Message;
                    if (tranCAP != null)
                        tranCAP.Rollback();
                }
            }
            return i;
        }

        //sudha created on 14/12
        public DataSet GetAllVendors()
        {
            CmdCAP = new SqlCommand();

            DsCAP = CommonDbFunctions.FillDataSet("spGetAllVendorsList", CmdCAP);

            return DsCAP;

        }

        public DataTable bindvendors()
        {
            CmdCAP = new SqlCommand();
            //CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Imode", SqlDbType.VarChar, 100, "select"));
            CmdCAP.CommandText = "getvendors";
            CmdCAP.CommandType = CommandType.StoredProcedure;
            dt = CommonDbFunctions.SetToDataTable(CmdCAP);
            return dt;
        }

        public DataTable vendorwiseitems(int vid)
        {
            CmdCAP = new SqlCommand();
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@vid", SqlDbType.Int, 100, vid));
            CmdCAP.CommandText = "sp_vendortotitems";
            CmdCAP.CommandType = CommandType.StoredProcedure;
            dt = CommonDbFunctions.SetToDataTable(CmdCAP);
            return dt;
        }
        

        public List<User>getvendoritemdetials (int vid)
        {

            CmdCAP = new SqlCommand();
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@vid", SqlDbType.Int, 100, vid));

            DsCAP = CommonDbFunctions.FillDataSet("sp_vendoritemdetials", CmdCAP);

            return CommonDbFunctions.ConvertDStolist(DsCAP);
        }

        public string updatevendoritems(int vid,int vpid,int psid)
        {
           
            CmdCAP = new SqlCommand();
            CmdCAP.Parameters.Clear();
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@vid", SqlDbType.Int, 0, vid));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Vpid", SqlDbType.Int, 0, vpid));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@psid", SqlDbType.Int,0,psid));
            using (ConCAP = new SqlConnection())
            {
                try
                {
                    ErrorMessage = CommonDbFunctions.SqlCommandExecution(CommandType.StoredProcedure, "sp_vendoritemsupdation", CmdCAP);

                }
                catch (SqlException ex)
                {
                    ErrorMessage = ex.Message;
                }
            }
            return ErrorMessage;

        }

        public string delvitem(int vpid)
        {
            CmdCAP = new SqlCommand();
            CmdCAP.Parameters.Clear();           
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Vpid", SqlDbType.Int, 0, vpid));            
            using (ConCAP = new SqlConnection())
            {
                try
                {
                    ErrorMessage = CommonDbFunctions.SqlCommandExecution(CommandType.StoredProcedure, "sp_vitemdel", CmdCAP);

                }
                catch (SqlException ex)
                {
                    ErrorMessage = ex.Message;
                }
            }
            return ErrorMessage;
        }

        public List<Vitem>getvendorwiseitems(int vid)
        {

            CmdCAP = new SqlCommand();
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@vid", SqlDbType.Int, 100, vid));

            DsCAP = CommonDbFunctions.FillDataSet("sp_vendortotitems", CmdCAP);

            return CommonDbFunctions.convertitemstolist(DsCAP);
        }

        public DataTable getitemsize()
        {
            CmdCAP = new SqlCommand();
            CmdCAP.CommandText = "sp_getitemsizes";
            CmdCAP.CommandType = CommandType.StoredProcedure;
            dt = CommonDbFunctions.SetToDataTable(CmdCAP);
            return dt;
        }
        public DataTable getmaterialtype()
        {
            CmdCAP = new SqlCommand();

            CmdCAP.CommandText = "sp_getitemmaterial";
            CmdCAP.CommandType = CommandType.StoredProcedure;
            dt = CommonDbFunctions.SetToDataTable(CmdCAP);
            return dt;
        }
        public DataTable getmaterialwork()
        {
            CmdCAP = new SqlCommand();

            CmdCAP.CommandText = "sp_getitemworktype";
            CmdCAP.CommandType = CommandType.StoredProcedure;
            dt = CommonDbFunctions.SetToDataTable(CmdCAP);
            return dt;
        }
        public DataTable getbrands()
        {            
                CmdCAP = new SqlCommand();             
                CmdCAP.CommandText = "sp_getitembrand";
                CmdCAP.CommandType = CommandType.StoredProcedure;
                dt = CommonDbFunctions.SetToDataTable(CmdCAP);
                return dt;
            
        }
        public DataTable getitemname(int vid,int prodscatid)
        {
            CmdCAP = new SqlCommand();
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@vid", SqlDbType.Int, 100, vid));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@prod_subcat_id", SqlDbType.Int, 100, prodscatid));
            CmdCAP.CommandText = "sp_getitemnames";
            CmdCAP.CommandType = CommandType.StoredProcedure;
            dt = CommonDbFunctions.SetToDataTable(CmdCAP);
            return dt;
        }

        public DataTable getdescitems(int vid)
        {
            CmdCAP = new SqlCommand();
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@vid", SqlDbType.Int, 100, vid));
            CmdCAP.CommandText = "sp_getvendoritemdesclist";
            CmdCAP.CommandType = CommandType.StoredProcedure;
            dt = CommonDbFunctions.SetToDataTable(CmdCAP);
            return dt; 
        }

       
    }

}
