using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SMSFCart.BOL;
using SMSFCart.DAL;

namespace SMSFCart.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {

        private readonly IHostingEnvironment _hostingEnvironment;
        //private string ImageFolder = "images/ProfilePhotos";
       

        public ItemsController(IConfiguration configuration, IHostingEnvironment hostingEnvironment)
        {
            Configuration = configuration;
            _hostingEnvironment = hostingEnvironment;
        }

        public IConfiguration Configuration { get; }
        
        DataSet ds = new DataSet();
        IActionResult IARresponse;
        ItemsDb db = new ItemsDb();
        VendorDb objVendorDb = new VendorDb();
        DataTable dt = new DataTable();
        [HttpPost]
        [Route("Getitemslist")]
        public IActionResult GetItemsData([FromBody] int id)
        {
            IARresponse = BadRequest();
            string path = "";
            string data = "";
            try
            {

                ds = db.GetListItems(id);
                if(ds.Tables.Count>0)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {

                        foreach (DataRow row in ds.Tables[0].Rows)
                        {
                            path = _hostingEnvironment.WebRootPath + "/images/Products/ProductsCategory/ProductsSubCategory/itemimg/" + row["cat_img"].ToString();
                            byte[] b = System.IO.File.ReadAllBytes(path);
                            data = "data:image/png;base64," + Convert.ToBase64String(b);
                            row["cat_img"] = data;
                        }

                    }

                    IARresponse = Ok(new { res = ds });

                }

                else
                {
                    IARresponse = Ok(new { res = "" });
                }
            }

            catch(Exception ex)
            {
                IARresponse = BadRequest(new { error=ex.Message});
            }

            return IARresponse;
        }


        
        //get items data by search names
        [HttpPost]
        [Route("GetItemsBySearchNames")]
        public IActionResult GetItemsBySearchNames([FromBody] string searchname)
        {
            IARresponse = BadRequest();
            string path = "";
            string data = "";
            try
            {

                ds = db.GetItemsBySearchnames(searchname);
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {

                        foreach (DataRow row in ds.Tables[0].Rows)
                        {
                            path = _hostingEnvironment.WebRootPath + "/images/Products/ProductsCategory/ProductsSubCategory/itemimg/" + row["cat_img"].ToString();
                            byte[] b = System.IO.File.ReadAllBytes(path);
                            data = "data:image/png;base64," + Convert.ToBase64String(b);
                            row["cat_img"] = data;
                        }

                    }

                    IARresponse = Ok(new { res = ds });

                }

                else
                {
                    IARresponse = Ok(new { res = "" });
                }
            }

            catch (Exception ex)
            {
                IARresponse = BadRequest(new { error = ex.Message });
            }

            return IARresponse;
        }







        //GetListItemsDataByPassing_Ids
        [HttpPost]
        [Route("GetItemsDataby_IDS")]
        public IActionResult GetItemsDataby_IDS([FromBody] List<int> list)
        {
            IARresponse = BadRequest();
            string path = "";
            string data = "";
            try
            {

                ds = db.GetListItemsDataByPassing_Ids(list);
                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {

                        foreach (DataRow row in ds.Tables[0].Rows)
                        {
                            path = _hostingEnvironment.WebRootPath + "/images/Products/ProductsCategory/ProductsSubCategory/itemimg/" + row["cat_img"].ToString();
                            byte[] b = System.IO.File.ReadAllBytes(path);
                            data = "data:image/png;base64," + Convert.ToBase64String(b);
                            row["cat_img"] = data;
                        }

                    }

                    IARresponse = Ok(new { res = ds });

                }

                else
                {
                    IARresponse = Ok(new { res = "" });
                }
            }

            catch (Exception ex)
            {
                IARresponse = BadRequest(new { error = ex.Message });
            }

            return IARresponse;
        }

        [HttpPost]
        [Route("GetItemDetailsbyid")]
        public IActionResult GetItemsDetailsbyid([FromBody] int id)
        {

            IARresponse = BadRequest();
            string path = "";
            string data = "";
            string[] imgarray=null;
            List<string> imgsbase64data = new List<string>();
            try
            {

                ds = db.GetItemDetails(id);
                if (ds.Tables[1].Rows.Count > 0)
                {

                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        imgarray = row["Images"].ToString().Split(',').ToArray();

                        foreach(string img in imgarray)
                        {
                            path = _hostingEnvironment.WebRootPath + "/images/Products/ProductsCategory/ProductsSubCategory/itemimg/Catloges/" + img;
                            byte[] b = System.IO.File.ReadAllBytes(path);
                            data = "data:image/png;base64," + Convert.ToBase64String(b);
                            imgsbase64data.Add(data);
                            //row["Images"] = String.Join(',', imgsbase64data);
                        }


                        path = _hostingEnvironment.WebRootPath + "/images/Products/ProductsCategory/ProductsSubCategory/itemimg/" + row["cat_img"].ToString();
                        byte[] bb = System.IO.File.ReadAllBytes(path);
                        data = "data:image/png;base64," + Convert.ToBase64String(bb);
                        row["cat_img"] = data;
                    }

                }

                IARresponse = Ok(new { res = ds,imagecatlogs= imgsbase64data });

            }

            catch (Exception ex)
            {
                IARresponse = BadRequest(new { error = ex.Message });
            }

            return IARresponse;
        }

        /*=============================================================BAG====================================================================*/



        [Authorize]
        [HttpPost]
        [Route("additemstobag")]
        public IActionResult AddItemsToBag(Item model)
        {

            IARresponse = BadRequest();
            //string res = null;
            try
            {
                if(db.AddItemsToBag(model)=="")
                {
                    IARresponse = Ok(new { res = "Item Added To Bag Successfully" });
                }
                else
                {
                    IARresponse = BadRequest(new { res = "Item Not Added To Bag... Try Again" });
                }
                
            }
            catch (Exception ex)
            {
                IARresponse = BadRequest(new { res = ex.Message });
            }
            return IARresponse;

        }

        //GetUserBagDetailsById
        [Authorize]
        [HttpPost]
        [Route("GetBagItemsDetailsbyid")]
        public IActionResult GetBagItemsDetailsbyid([FromBody] int id)
        {

            IARresponse = BadRequest();
            string path = "";
            string data = "";
          
            List<string> imgsbase64data = new List<string>();
            try
            {

                ds = db.GetUserBagDetailsById(id);
                if (ds.Tables[0].Rows.Count > 0)
                {

                    foreach (DataRow row in ds.Tables[0].Rows)
                    {

                        path = _hostingEnvironment.WebRootPath + "/images/Products/ProductsCategory/ProductsSubCategory/itemimg/" + row["cat_img"].ToString();
                        byte[] bb = System.IO.File.ReadAllBytes(path);
                        data = "data:image/png;base64," + Convert.ToBase64String(bb);
                        row["cat_img"] = data;
                    }

                }

                IARresponse = Ok(new { res = ds });

            }

            catch (Exception ex)
            {
                IARresponse = BadRequest(new { error = ex.Message });
            }

            return IARresponse;
        }



        [Authorize]
        [HttpPost]
        [Route("comm_movetowhishlist_removefrombag")]
        //CommonForMovetowhislist_RemovefromBag
       
        public IActionResult comm_movetowhishlist_removefrombag([FromBody] Item model)
        {

            IARresponse = BadRequest();

            try
            {
                if(db.CommonForMovetowhislist_RemovefromBag(model)=="")
                {
                    IARresponse = Ok(new { res = "Successfull" });
                }
                else
                {
                    IARresponse = BadRequest(new { res = "Something went worng Try Again" });
                }
               
            }
            catch (Exception ex)
            {
                IARresponse = BadRequest(new { res = ex.Message });
            }
            return IARresponse;

        }

        [Authorize]
        [HttpPost]
        [Route("Updatebagdetails")]

        public IActionResult UpdateBAdetails([FromBody] Item model)
        {

            IARresponse = BadRequest();

            try
            {
                if (db.UpdateBagDetails(model) == "")
                {
                    IARresponse = Ok(new { res = "Successfull" });
                }
                else
                {
                    IARresponse = BadRequest(new { res = "Something went worng Try Again" });
                }

            }
            catch (Exception ex)
            {
                IARresponse = BadRequest(new { res = ex.Message });
            }
            return IARresponse;

        }



        /*=============================================================whishlist====================================================================*/


        [Authorize]
        [HttpPost]
        [Route("Getwishlist")]
        public IActionResult GetWishListdata([FromBody] int id)
        {
            //GetDataFromWhishList

            IARresponse = BadRequest();
            string path = "";
            string data = "";
            try
            {

                ds = db.GetDataFromWhishList(id);
                if (ds.Tables[0].Rows.Count > 0)
                {

                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        path = _hostingEnvironment.WebRootPath + "/images/Products/ProductsCategory/ProductsSubCategory/itemimg/" + row["cat_img"].ToString();
                        byte[] b = System.IO.File.ReadAllBytes(path);
                        data = "data:image/png;base64," + Convert.ToBase64String(b);
                        row["cat_img"] = data;
                    }

                }

                IARresponse = Ok(new { res = ds });

            }

            catch (Exception ex)
            {
                IARresponse = BadRequest(new { error = ex.Message });
            }

            return IARresponse;


        }

        [Authorize]
        [HttpPost]
        [Route("GetItemsizedatabyId")]
        public IActionResult GetItemsizedatabyId([FromBody] int id)
        {
            //GetDataFromWhishList

            IARresponse = BadRequest();
         
            try
            {

                ds = db.GetItemsSizedata(id);
               

                IARresponse = Ok(new { res = ds });

            }

            catch (Exception ex)
            {
                IARresponse = BadRequest(new { error = ex.Message });
            }

            return IARresponse;
        }

        [Authorize]
        [HttpPost]
        [Route("removeitemfromwhishlist")]
        //RemoveItemFromWhishList
        public IActionResult RemoveitemfromWhishlist([FromBody] Item model)
        {

            IARresponse = BadRequest();

            try
            {
               if(db.RemoveItemFromWhishList(model)=="")
                {
                    IARresponse = Ok(new { res = "Successfull" });
                }
               else
                {
                    IARresponse = BadRequest(new { res = "something went worng.... try again" });
                }
               
            }
            catch (Exception ex)
            {
                IARresponse = BadRequest(new { res = ex.Message });
            }
            return IARresponse;

        }

        /*=============================================================Orders====================================================================*/

        [Authorize]
        [HttpPost]
        [Route("addoders")]
        public IActionResult AddOders(orders model)
        {

            IARresponse = BadRequest();
            //string res = null;
            try
            {
                if (db.AddOrders(model) == "")
                {
                    IARresponse = Ok(new { res = "Items Odered Successfully" });
                }
                else
                {
                    IARresponse = BadRequest(new { res = "Something Went Wrong... Try Again" });
                }

            }
            catch (Exception ex)
            {
                IARresponse = BadRequest(new { res = ex.Message });
            }
            return IARresponse;

        }

        [Authorize]
        [HttpPost]
        [Route("Getordersdata")]
        public IActionResult GetOrderesData([FromBody] int id)
        {
            IARresponse = BadRequest();
            string path = "";
            string data = "";
            try
            {

                ds = db.GetOrdersData(id);
                if(ds.Tables[1].Rows.Count>0)
                {

                   
                    foreach (DataRow row in ds.Tables[1].Rows)
                    {
                        path = _hostingEnvironment.WebRootPath + "/images/Products/ProductsCategory/ProductsSubCategory/itemimg/" + row["cat_img"].ToString();
                        byte[] b = System.IO.File.ReadAllBytes(path);
                        data = "data:image/png;base64," + Convert.ToBase64String(b);
                        row["cat_img"] = data;
                    }

                }

                IARresponse = Ok(new { res = ds });

            }

            catch (Exception ex)
            {
                IARresponse = BadRequest(new { error = ex.Message });
            }

            return IARresponse;
        }
        /*============================================Products======================================================*/


        [HttpPost]
        [Route("GeProductsData")]
        public IActionResult GeProductsData()
        {

            IARresponse = BadRequest();

            try
            {
               dt = objVendorDb.bindproduct();

                IARresponse= Ok(new { res = dt });
            }
            catch(Exception ex)
            {
                IARresponse = BadRequest(new { error = ex.Message });
            }

            return IARresponse;
        }

        [HttpPost]
        [Route("GeProductscategoriesData")]
        public IActionResult GeProductscategoriesData([FromBody] int id)
        {

            IARresponse = BadRequest();

            try
            {
                dt = objVendorDb.bindpcategories(id);

                IARresponse = Ok(new { res = dt });
            }
            catch (Exception ex)
            {
                IARresponse = BadRequest(new { error = ex.Message });
            }

            return IARresponse;
        }


        [HttpPost]
        [Route("GeProductsSUBcategoriesData")]
        public IActionResult GeProductsSUBcategoriesData([FromBody] int id)
        {

            IARresponse = BadRequest();

            try
            {
                dt = objVendorDb.bindsubcatbyvid(id,10);

                IARresponse = Ok(new { res = dt });
            }
            catch (Exception ex)
            {
                IARresponse = BadRequest(new { error = ex.Message });
            }

            return IARresponse;
        }


        [HttpPost]
        [Route("GeAllProductsWithSUBcategoriesData")]
        public IActionResult GeAllProductsWithSUBcategoriesData([FromBody] int id)
        {

            IARresponse = BadRequest();

            try
            {
                ds = db.GetAllProdcutswithsubCatg(id);

                IARresponse = Ok(new { res = ds });
            }
            catch (Exception ex)
            {
                IARresponse = BadRequest(new { error = ex.Message });
            }

            return IARresponse;
        }

        [HttpPost]
        [Route("GeAllProductsWithcategoriesData")]
        public IActionResult GeAllProducts_With_categoriesData()
        {

            IARresponse = BadRequest();

            try
            {
                ds = db.GetAllProdcutswithCatg();

                IARresponse = Ok(new { res = ds });
            }
            catch (Exception ex)
            {
                IARresponse = BadRequest(new { error = ex.Message });
            }

            return IARresponse;
        }


        [HttpPost]
        [Route("GetAllBrandsData")]
        public IActionResult GetAllBrandsData()
        {

            IARresponse = BadRequest();
            string path = "";
            string data = "";
            try
            {
                ds = db.GetAllBrandsData();

                if (ds.Tables[0].Rows.Count > 0)
                {


                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        path = _hostingEnvironment.WebRootPath + "/images/Products/Brands/" + row["b_img"].ToString();
                        byte[] b = System.IO.File.ReadAllBytes(path);
                        data = "data:image/png;base64," + Convert.ToBase64String(b);
                        row["b_img"] = data;
                        path = _hostingEnvironment.WebRootPath + "/images/Products/Brands/" + row["offer_img"].ToString();
                        byte[] bb = System.IO.File.ReadAllBytes(path);
                        data = "data:image/png;base64," + Convert.ToBase64String(bb);
                        row["offer_img"] = data;
                    }

                }

                IARresponse = Ok(new { res = ds });
            }
            catch (Exception ex)
            {
                IARresponse = BadRequest(new { error = ex.Message });
            }

            return IARresponse;
        }


        [HttpPost]
        [Route("GetBrandsDatabyname")]
        public IActionResult GetBrandsDatabyname([FromBody] string name)
        {

            IARresponse = BadRequest();
            string path = "";
            string data = "";
            try
            {
                ds = db.GetBrandsDataById(name);

                if (ds.Tables[0].Rows.Count > 0)
                {


                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        path = _hostingEnvironment.WebRootPath + "/images/Products/ProductsCategory/ProductsSubCategory/itemimg/" + row["cat_img"].ToString();
                        byte[] b = System.IO.File.ReadAllBytes(path);
                        data = "data:image/png;base64," + Convert.ToBase64String(b);
                        row["cat_img"] = data;
                    }

                }

                IARresponse = Ok(new { res = ds });
            }
            catch (Exception ex)
            {
                IARresponse = BadRequest(new { error = ex.Message });
            }

            return IARresponse;
        }

        /*===============================================================Filters=======================================================================*/

        [HttpPost]
        [Route("FiltersItems")]
        public IActionResult FiltersItems([FromBody] FiltersModel model)
        {
            string path = "";
            string data = "";
            IARresponse = BadRequest();
          
            try
            {
                ds = db.GetItemsByFilters(model);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {

                        foreach (DataRow row in ds.Tables[0].Rows)
                        {
                            path = _hostingEnvironment.WebRootPath + "/images/Products/ProductsCategory/ProductsSubCategory/itemimg/" + row["cat_img"].ToString();
                            byte[] b = System.IO.File.ReadAllBytes(path);
                            data = "data:image/png;base64," + Convert.ToBase64String(b);
                            row["cat_img"] = data;
                        }

                    }

                   

                }
                IARresponse = Ok(new { res = ds });

            }
            catch (Exception ex)
            {
                IARresponse = BadRequest(new { error = ex.Message });
            }

            return IARresponse;
        }


    }
}