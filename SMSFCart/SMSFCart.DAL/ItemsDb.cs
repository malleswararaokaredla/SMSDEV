using SMSFCart.BOL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.Text;

namespace SMSFCart.DAL
{
  public class ItemsDb
    {

        DBConnection db = new DBConnection();

        SqlCommand CmdCAP;

        DataSet DsCAP;

        string ErrorMessage;

        Defaultclass dc = new Defaultclass();
        Item model = new Item();


        public DataSet GetListItems(int id)
        {
            
            CmdCAP = new SqlCommand();
            //@prod_subcat_id
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@prod_subcat_id", SqlDbType.Int, 100,id));
            DsCAP = CommonDbFunctions.FillDataSet("GetKurtasData", CmdCAP);                   
            return DsCAP;
        }


        public DataSet GetItemsBySearchnames(string searchname)
        {

            CmdCAP = new SqlCommand();
            //@prod_subcat_id
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@name", SqlDbType.VarChar, 100, searchname));
            DsCAP = CommonDbFunctions.FillDataSet("GetItemsBasedsearch", CmdCAP);
            return DsCAP;
        }




        public DataSet GetListItemsDataByPassing_Ids(List<int> list)
        {
            CmdCAP = new SqlCommand();

            string str = db.Sconnection();

            DataTable dt = new DataTable();
            dt.Columns.Add(new DataColumn("n", typeof(Int32)));
          

            foreach (int num in list)
            {

                dt.Rows.Add(num);
           }

            //using (SqlConnection con = new SqlConnection(str))
            //{

            //    SqlCommand sqlcom = new SqlCommand("GetItemsByPassing_IDS", con);
            //    sqlcom.CommandType = CommandType.StoredProcedure;

            //    sqlcom.Parameters.AddWithValue("@@proids", dt);
            //    con.Open();
            //    DsCAP = CommonDbFunctions.FillDataSet("GetItemsByPassing_IDS", CmdCAP);

            //    return DsCAP;
            //}


            CmdCAP.Parameters.AddWithValue("@proids", dt);

            DsCAP = CommonDbFunctions.FillDataSet("GetItemsByPassing_IDS", CmdCAP);

            return DsCAP;
        }


        public DataSet GetItemDetails(int id)
        {
            CmdCAP = new SqlCommand();
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@itm_id", SqlDbType.Int, 100, id));

            DsCAP = CommonDbFunctions.FillDataSet("GetItemDetails", CmdCAP);

            return DsCAP;
        }

        public string AddItemsToBag(Item item)
        {
            CmdCAP = new SqlCommand();

            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@uid", SqlDbType.Int, 100, item.uid));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@itm_id", SqlDbType.Int, 100, item.itm_id));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@size", SqlDbType.VarChar, 50, string.IsNullOrEmpty(item.size) ? SqlString.Null : item.size));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@price", SqlDbType.Int, 100, item.price));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@qunty", SqlDbType.Int, 100, item.qunty));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@status", SqlDbType.VarChar, 100, "INB"));

            ErrorMessage = CommonDbFunctions.SqlCommandExecution(CommandType.StoredProcedure, "AdditemsToBag", CmdCAP);
            return ErrorMessage;
        }



        /*------------------------------------bag------------------------------------------------------*/


        public DataSet GetUserBagDetailsById(int id)
        {

            CmdCAP = new SqlCommand();
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@uid", SqlDbType.Int, 100, id));

            DsCAP = CommonDbFunctions.FillDataSet("GetUserBagDetials", CmdCAP);

            return DsCAP;
        }

        public string CommonForMovetowhislist_RemovefromBag(Item item)
        {
            CmdCAP = new SqlCommand();

            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@uid", SqlDbType.Int, 100, item.uid));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@itm_id", SqlDbType.Int, 100, item.itm_id));
           CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@type", SqlDbType.Int, 100, item.type));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@bag_id", SqlDbType.Int, 100, item.bag_id));
            
            ErrorMessage = CommonDbFunctions.SqlCommandExecution(CommandType.StoredProcedure, "MoveToWishLost_AND_RemovefromBag", CmdCAP);
            return ErrorMessage;
        }

        public string UpdateBagDetails(Item item)
        {
            CmdCAP = new SqlCommand();

           
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@bag_id", SqlDbType.Int, 100, item.bag_id));           
           
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@qunty", SqlDbType.Int, 100, item.qunty));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@size", SqlDbType.VarChar, 100, item.size));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@type", SqlDbType.Int, 100, item.type));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@price", SqlDbType.Int, 100, item.price));
            ErrorMessage = CommonDbFunctions.SqlCommandExecution(CommandType.StoredProcedure, "UpdateBagDetails", CmdCAP);
            return ErrorMessage;
        }



        /*------------------------------------whish list------------------------------------------------------*/

        public DataSet GetDataFromWhishList(int uid)
        {
            CmdCAP = new SqlCommand();

            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@uid", SqlDbType.Int, 100, uid));
            DsCAP = CommonDbFunctions.FillDataSet("GetWhishListData", CmdCAP);
           
            return DsCAP;
        }

        public DataSet GetItemsSizedata(int id)
        {
            CmdCAP = new SqlCommand();

            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@itm_id", SqlDbType.Int, 100, id));
            DsCAP = CommonDbFunctions.FillDataSet("GetItemSizeData", CmdCAP);

            return DsCAP;
        }

        public string RemoveItemFromWhishList(Item item)
        {
            CmdCAP = new SqlCommand();

           
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@wh_id", SqlDbType.Int, 100, item.bag_id));

            ErrorMessage = CommonDbFunctions.SqlCommandExecution(CommandType.StoredProcedure, "RemoveItemfromWhishList", CmdCAP);
            return ErrorMessage;
        }



        /*=================================================           Orders   ==========================================================================*/

        public string AddOrders(orders item)
        {
            CmdCAP = new SqlCommand();

            item.ord_date = DateTime.Now.ToString();
            item.ord_status = "Ordered Taken";
            item.expe_dvy_date = DateTime.Now.AddDays(7).ToString();
            item.actl_dvy= DateTime.Now.AddDays(7).ToString();

            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@uid", SqlDbType.Int, 100, item.uid));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@itm_id", SqlDbType.VarChar, 150, item.itm_id));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@aid", SqlDbType.Int, 50, item.aid));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@phone", SqlDbType.VarChar, 100, item.phone));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@amount", SqlDbType.Int, 100, item.amount));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@shippingchrgs", SqlDbType.Int, 100, item.shipping_charges));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@totalamount", SqlDbType.Int, 50, item.Total_amount));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@paymentmode", SqlDbType.VarChar, 100, item.payment_mode));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@cardno", SqlDbType.VarChar, 100, item.cardno));

            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@cardname", SqlDbType.VarChar, 100, item.cardname));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@expmonth", SqlDbType.Int, 100, item.expmonth));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@expyear", SqlDbType.Int, 100, item.expyear));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@cvv", SqlDbType.Int, 50, item.cvv));
         
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@ord_date", SqlDbType.VarChar, 100, item.ord_date)); 

                 CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@ord_status", SqlDbType.VarChar, 100, item.ord_status));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@expe_dvy_date", SqlDbType.VarChar, 100, item.expe_dvy_date));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@actl_dvy", SqlDbType.VarChar, 100, item.actl_dvy));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@bagstaus", SqlDbType.VarChar, 100, "ORD"));
            ErrorMessage = CommonDbFunctions.SqlCommandExecution(CommandType.StoredProcedure, "AddOrders", CmdCAP);
            return ErrorMessage;
        }

        public DataSet GetOrdersData(int uid)
        {
           // string itm_ids = "";
           
            CmdCAP = new SqlCommand();

            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@uid", SqlDbType.Int, 100, uid));
            DsCAP = CommonDbFunctions.FillDataSet("GetOrdersdatabyuid", CmdCAP);


            //if(DsCAP.Tables[0].Rows.Count>0)
            //{
            //    foreach(DataRow row in DsCAP.Tables[0].Rows)
            //    {
            //        itm_ids = row["itm_id"].ToString();
            //        aid =Convert.ToInt32(row["Address"].ToString());
            //    }
            //}

            


            return DsCAP;
        }

        /*===============================================================products===================================================================================*/

        public DataSet GetAllProdcutswithsubCatg(int id)
        {
            // string itm_ids = "";

            CmdCAP = new SqlCommand();

            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@pid", SqlDbType.Int, 100, id));
            DsCAP = CommonDbFunctions.FillDataSet("GetAllSubCatgProductDetails", CmdCAP);

            return DsCAP;
        }
        public DataSet GetAllProdcutswithCatg()
        {
            // string itm_ids = "";

            CmdCAP = new SqlCommand();

           
            DsCAP = CommonDbFunctions.FillDataSet("GetAllProductsDataWithCategory", CmdCAP);

            return DsCAP;
        }
        public DataSet GetAllBrandsData()
        {
            // string itm_ids = "";

            CmdCAP = new SqlCommand();


            DsCAP = CommonDbFunctions.FillDataSet("GetAllBrandsData", CmdCAP);

            return DsCAP;
        }
        public DataSet GetBrandsDataById(string name)
        {
            // string itm_ids = "";

            CmdCAP = new SqlCommand();

            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Bname", SqlDbType.VarChar, 150, name));
            DsCAP = CommonDbFunctions.FillDataSet("GetProductsDataByBrands", CmdCAP);

            return DsCAP;
        }


        /*==================================================Filters=================================================================*/


        public DataSet GetItemsByFilters(FiltersModel item)
        {
            // string itm_ids = "";

            CmdCAP = new SqlCommand();

            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@Bname", SqlDbType.VarChar, 150, item.bname));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@minprice", SqlDbType.Int, 150, item.minprice));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@maxprice", SqlDbType.Int, 150, item.maxprice));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@type", SqlDbType.Int, 150, item.type));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@prod_subcat_id", SqlDbType.Int, 150, item.prod_subcat_id));
            CmdCAP.Parameters.Add(CommonDbFunctions.AddParameter("@name", SqlDbType.VarChar, 150, item.name));
            DsCAP = CommonDbFunctions.FillDataSet("FilterItems", CmdCAP);

            return DsCAP;
        }

    }
}
