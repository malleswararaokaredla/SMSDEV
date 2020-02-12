using SMSFCart.BOL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.IO;

namespace SMSFCart.DAL
{
   public class AdminDb:DBConnection
    {
        DBConnection db = new DBConnection();
        SqlConnection ConCAP;
        SqlCommand CmdCAP;        
        string ErrorMessage;
        SqlTransaction tranCAP;
        DataSet DsCAP;
        DataTable dt;

        public string AddorEditVenderByAdmin(User user)
        {

            string strConnstring = db.Sconnection();
            CmdCAP = new SqlCommand();
            
            
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Firstname", SqlDbType.VarChar, 100, string.IsNullOrEmpty(user.FirstName) ? SqlString.Null : user.FirstName));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@LastName", SqlDbType.VarChar, 100, string.IsNullOrEmpty(user.LastName) ? SqlString.Null : user.LastName));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Email", SqlDbType.VarChar, 100, string.IsNullOrEmpty(user.Email) ? SqlString.Null : user.Email));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@PhoneNo", SqlDbType.VarChar, 100, string.IsNullOrEmpty(user.PhoneNo) ? SqlString.Null : user.PhoneNo));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Password", SqlDbType.VarChar, 100, string.IsNullOrEmpty(user.Password) ? SqlString.Null : user.Password));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Gender", SqlDbType.VarChar, 10, string.IsNullOrEmpty(user.Gender) ? SqlString.Null : user.Gender));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@UID", SqlDbType.Int, 0, user.UID));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@RoleID", SqlDbType.Int, 0, user.RoleID));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@IsActive", SqlDbType.Int, 0, user.IsActive));
                         

            CmdCAP.CommandText = "spAddorEditVenderByAdmin";
            CmdCAP.CommandType = CommandType.StoredProcedure;

            using (ConCAP = new SqlConnection(strConnstring))
            {
                try
                {
                    ConCAP.Open();
                    tranCAP = ConCAP.BeginTransaction();
                    CmdCAP.Connection = ConCAP;
                    CmdCAP.Transaction = tranCAP;
                    CmdCAP.Parameters.Add("@id", SqlDbType.Int).Direction = ParameterDirection.Output;
                    int iENQResult = CmdCAP.ExecuteNonQuery();

                    tranCAP.Commit();                    

                    ErrorMessage = "";
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

        public int CheckMailForExistVendor(string strEmail)
        {
            int vid=0;
            try
            {
                CmdCAP = new SqlCommand();
                CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Email", SqlDbType.VarChar, 50, string.IsNullOrEmpty(strEmail) ? SqlString.Null : strEmail));
                DsCAP = CommonDbFunctions.FillDataSet("spCheckEmail", CmdCAP);

                if (DsCAP.Tables[0].Rows.Count >= 0)
                {
                    vid =Convert.ToInt32(DsCAP.Tables[0].Rows[0][0].ToString());
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return vid;
        }
        //sudha created on 02/01
        public DataSet GetAllVendorsByActiveStatus(int IsActive)
        {
            CmdCAP = new SqlCommand();

            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@IsActive", SqlDbType.Int, 0, IsActive));

            DsCAP = CommonDbFunctions.FillDataSet("spGetAllVendorsByActiveStatus", CmdCAP);

            return DsCAP;

        }

        public string DeleteVenderByAdmin(int VID)
        {
            try
            {
                CmdCAP = new SqlCommand();
                CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@VID", SqlDbType.Int, 0, VID));
                DsCAP = CommonDbFunctions.FillDataSet("spDeleteVenderByAdmin", CmdCAP);

                ErrorMessage = "";

            }
            catch (Exception ex)
            {
                ErrorMessage = ex.Message;
                Console.WriteLine(ex.Message);
            }
            return ErrorMessage;
        }

        public string ChangeVenderStatusByAdmin(string strVIDS)
        {
            try
            {
                CmdCAP = new SqlCommand();
                CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@VID", SqlDbType.VarChar, 100, string.IsNullOrEmpty(strVIDS) ? SqlString.Null : strVIDS));
                DsCAP = CommonDbFunctions.FillDataSet("spChangeVenderStatusByAdmin", CmdCAP);

                ErrorMessage = "";

            }
            catch (Exception ex)
            {
                ErrorMessage = ex.Message;
                Console.WriteLine(ex.Message);
            }
            return ErrorMessage;
        }

        public DataSet GetAllProductsByActiveStatus(int IsActive)
        {
            CmdCAP = new SqlCommand();

            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@IsActive", SqlDbType.Int, 0, IsActive));

            DsCAP = CommonDbFunctions.FillDataSet("spGetAllProductsByActiveStatus", CmdCAP);

            return DsCAP;

        }
        public int CheckProductNameIsExist(string strPName)
        {
            int pid = 0;
            try
            {
                CmdCAP = new SqlCommand();
                CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@PName", SqlDbType.VarChar, 50, string.IsNullOrEmpty(strPName) ? SqlString.Null : strPName));
                DsCAP = CommonDbFunctions.FillDataSet("spCheckPName", CmdCAP);

                if (DsCAP.Tables[0].Rows.Count >= 0)
                {
                    pid = Convert.ToInt32(DsCAP.Tables[0].Rows[0][0].ToString());
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return pid;
        }

        public string AddorEditProductByAdmin(Products_Types product)
        {

            CmdCAP = new SqlCommand();


            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@PID", SqlDbType.Int, 0, product.PID));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@pName", SqlDbType.VarChar, 100, string.IsNullOrEmpty(product.pName) ? SqlString.Null : product.pName));                     
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@IsActive", SqlDbType.Bit, 0, product.IsActive));

                      
            ErrorMessage = CommonDbFunctions.SqlCommandExecution(CommandType.StoredProcedure, "spAddorEditProductByAdmin", CmdCAP);
            return ErrorMessage;
        }


        public string DeleteProductByAdmin(int PID)
        {
            try
            {
                CmdCAP = new SqlCommand();
                CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@PID", SqlDbType.Int, 0, PID));
                DsCAP = CommonDbFunctions.FillDataSet("spDeleteProductByAdmin", CmdCAP);

                ErrorMessage = "";

            }
            catch (Exception ex)
            {
                ErrorMessage = ex.Message;
                Console.WriteLine(ex.Message);
            }
            return ErrorMessage;
        }

        public string ChangeProductStatusByAdmin(string strPIDS)
        {
            try
            {
                CmdCAP = new SqlCommand();
                CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@PID", SqlDbType.VarChar, 100, string.IsNullOrEmpty(strPIDS) ? SqlString.Null : strPIDS));
                DsCAP = CommonDbFunctions.FillDataSet("spChangeProductStatusByAdmin", CmdCAP);

                ErrorMessage = "";

            }
            catch (Exception ex)
            {
                ErrorMessage = ex.Message;
                Console.WriteLine(ex.Message);
            }
            return ErrorMessage;
        }


        public DataSet GeyAllProducts_CategoryByActiveStatus(int IsActive)
        {
            CmdCAP = new SqlCommand();

            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@IsActive", SqlDbType.Int, 0, IsActive));

            DsCAP = CommonDbFunctions.FillDataSet("spGeyAllProducts_CategoryByActiveStatus", CmdCAP);

            return DsCAP;
        }

        public DataSet GeyAllProducts_SubcategoryByActiveStatus(int IsActive)
        {
            CmdCAP = new SqlCommand();

            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@IsActive", SqlDbType.Int, 0, IsActive));

            DsCAP = CommonDbFunctions.FillDataSet("spGeyAllProducts_SubcategoryByActiveStatus", CmdCAP);

            return DsCAP;
        }

        public DataSet GeyAllProducts_Category_SubcategoryList()
        {
            CmdCAP = new SqlCommand();            

            DsCAP = CommonDbFunctions.FillDataSet("spGeyAllProducts_Category_SubcategoryList", CmdCAP);

            return DsCAP;
            
        }

        public string AddorEditCategoryByAdmin(Products_Category product_category)
        {

            CmdCAP = new SqlCommand();


            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@prod_cat_id", SqlDbType.Int, 0, product_category.prod_cat_id));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@pcName", SqlDbType.VarChar, 100, string.IsNullOrEmpty(product_category.pcName) ? SqlString.Null : product_category.pcName));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@PID", SqlDbType.Int, 0, product_category.PID));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@IsActive", SqlDbType.Bit, 0, product_category.IsActive));


            ErrorMessage = CommonDbFunctions.SqlCommandExecution(CommandType.StoredProcedure, "spAddorEditCategoryByAdmin", CmdCAP);
            return ErrorMessage;
        }


        public string DeleteCategoryByAdmin(int prod_cat_id)
        {
            try
            {
                CmdCAP = new SqlCommand();
                CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@prod_cat_id", SqlDbType.Int, 0, prod_cat_id));
                DsCAP = CommonDbFunctions.FillDataSet("spDeleteCategoryByAdmin", CmdCAP);

                ErrorMessage = "";

            }
            catch (Exception ex)
            {
                ErrorMessage = ex.Message;
                Console.WriteLine(ex.Message);
            }
            return ErrorMessage;
        }

        public DataTable GetAllCategories()
        {
            CmdCAP = new SqlCommand();
            CmdCAP.CommandText = "spGetAllProducts_Category";
            CmdCAP.CommandType = CommandType.StoredProcedure;
            dt = CommonDbFunctions.SetToDataTable(CmdCAP);
            return dt;
        }

        public string AddorEditSubCategoryByAdmin(Products_SubCategory product_subcategory)
    {

        CmdCAP = new SqlCommand();


        CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@prod_subcat_id", SqlDbType.Int, 0, product_subcategory.prod_subcat_id));
        CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@pscName", SqlDbType.VarChar, 100, string.IsNullOrEmpty(product_subcategory.pscName) ? SqlString.Null : product_subcategory.pscName));
        CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@prod_cat_id", SqlDbType.Int, 0, product_subcategory.prod_cat_id));
        CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@IsActive", SqlDbType.Bit, 0, product_subcategory.IsActive));


        ErrorMessage = CommonDbFunctions.SqlCommandExecution(CommandType.StoredProcedure, "spAddorEditSubCategoryByAdmin", CmdCAP);
        return ErrorMessage;
    }
        
        public string DeleteSubCategoryByAdmin(int prod_subcat_id)
    {
        try
        {
            CmdCAP = new SqlCommand();
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@prod_subcat_id", SqlDbType.Int, 0, prod_subcat_id));
            DsCAP = CommonDbFunctions.FillDataSet("spDeleteSubCategoryByAdmin", CmdCAP);

            ErrorMessage = "";

        }
        catch (Exception ex)
        {
            ErrorMessage = ex.Message;
            Console.WriteLine(ex.Message);
        }
        return ErrorMessage;
    }

        public DataSet GeyAllOrdersDetails()
        {
            CmdCAP = new SqlCommand();

            DsCAP = CommonDbFunctions.FillDataSet("spGeyAllOrderDetails", CmdCAP);

            return DsCAP;

        }

    }
}
