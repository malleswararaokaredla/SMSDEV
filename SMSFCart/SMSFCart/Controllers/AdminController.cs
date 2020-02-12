using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using SMSFCart.DAL;
using SMSFCart.BOL;
using System.Data;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System.Linq;

namespace SMSFCart.Controllers
{

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        public IConfiguration IConfiguration { get; }


        AdminDb objadminDb = new AdminDb();
        IActionResult IARresponse;
        DataSet vds = new DataSet();
        AdminDb objadmindb = new AdminDb();
        DataTable TableData = new DataTable();

        [HttpPost]
        [Route("AddorEditVenderByAdmin")]
        public IActionResult AddorEditVenderByAdmin([FromBody] User model)
        {
            IARresponse = Unauthorized();

            User vendor = new User();

            try
            {

                vendor.FirstName = model.FirstName;
                vendor.LastName = model.LastName;
                vendor.Email = model.Email;
                vendor.PhoneNo = model.PhoneNo;
                vendor.RoleID = 2;
                vendor.UID = model.UID;
                vendor.Password = model.Password;
                vendor.Gender = model.Gender;
                vendor.IsActive = 1;

                if (objadmindb.AddorEditVenderByAdmin(vendor) == "")
                {
                    IARresponse = Ok(new { res = "Vendor Added / Updated Successfully" });
                }
                else
                {
                    IARresponse = BadRequest(new { res = "Vendor not Added / Updated... try again later!.." + objadmindb.AddorEditVenderByAdmin(vendor) });
                }
            }
            catch (Exception ex)
            {

                IARresponse = BadRequest(new { res = ex.Message });

            }
            return IARresponse;
        }

        [HttpGet]
        [Route("CheckMailForExistVendor/{Email}")]
        public IActionResult CheckMailForExistVendor(string strEmail)
        {
            int vid = 0;
            IARresponse = BadRequest();

            try
            {
                vid = objadminDb.CheckMailForExistVendor(strEmail);

                IARresponse = Ok(new { res = vid });
            }
            catch (Exception ex)
            {
                IARresponse = BadRequest(ex.Message + "  in AdminController CheckMailForExistVendor()");
            }
            return IARresponse;
        }

        //sudha on 02/01
        [HttpGet]
        [Route("GetAllVendorsByActiveStatus/{IsActive}")]
        public IActionResult GetAllVendorsByActiveStatus(int IsActive)
        {
            IARresponse = BadRequest();

            try
            {

                vds = objadminDb.GetAllVendorsByActiveStatus(IsActive);

                if (vds != null)
                {
                    IARresponse = Ok(new
                    {
                        vendordata = vds
                    });
                }
            }
            catch (Exception ex)
            {

                IARresponse = BadRequest(ex.Message + "  in AdminController GetAllVendorsByActiveStatus()");

            }
            return IARresponse;

        }

        [HttpPost]
        [Route("DeleteVenderByAdmin")]
        public IActionResult DeleteVenderByAdmin([FromBody] int Vid)
        {
            IARresponse = BadRequest();
            try
            {
                if (objadmindb.DeleteVenderByAdmin(Vid) == "")
                {
                    IARresponse = Ok(new { res = "Vendor Deleted Successfully" });
                }
                else
                {
                    IARresponse = BadRequest(new { res = "Vendor not Deleted... try again later!.." + objadmindb.DeleteVenderByAdmin(Vid) });
                }
            }
            catch (Exception ex)
            {
                IARresponse = BadRequest(new { res = ex.Message });
            }
            return IARresponse;
        }

        [HttpPost]
        [Route("ChangeVenderStatusByAdmin")]
        public IActionResult ChangeVenderStatusByAdmin([FromBody] string[] strVIDS)
        {
            IARresponse = BadRequest();
            string strVids = null;

            if (strVIDS.Length > 0)
            {
                for (int iArrCount = 0; iArrCount < strVIDS.Length; iArrCount++)
                {
                    if (strVids != null)
                    {
                        strVids += ',' + strVIDS[iArrCount].ToString();
                    }
                    else
                    {
                        strVids += strVIDS[iArrCount].ToString();
                    }

                }
            }

            try
            {

                if (objadmindb.ChangeVenderStatusByAdmin(strVids) == "")
                {
                    IARresponse = Ok(new { res = "" });// "Vendors " + actiontype + " successfully" });
                }
                else
                {
                    IARresponse = BadRequest(new { res = "Try Again later!.." + objadmindb.ChangeVenderStatusByAdmin(strVids) });

                }
            }
            catch (Exception ex)
            {
                IARresponse = BadRequest(new { res = ex.Message });
            }
            return IARresponse;
        }


        [HttpGet]
        [Route("GetAllProductsByActiveStatus/{IsActive}")]
        public IActionResult GetAllProductsByActiveStatus(int IsActive)
        {
            IARresponse = BadRequest();

            try
            {

                vds = objadminDb.GetAllProductsByActiveStatus(IsActive);

                if (vds != null)
                {
                    IARresponse = Ok(new
                    {
                        productdata = vds
                    });
                }
            }
            catch (Exception ex)
            {

                IARresponse = BadRequest(ex.Message + "  in AdminController GetAllProductsByActiveStatus()");

            }
            return IARresponse;

        }


        [HttpGet]
        [Route("CheckProductNameIsExist/{pName}")]
        public IActionResult CheckProductNameIsExist(string pName)
        {
            int pid = 0;
            IARresponse = BadRequest();

            try
            {
                pid = objadminDb.CheckProductNameIsExist(pName);

                IARresponse = Ok(new { res = pid });
            }
            catch (Exception ex)
            {
                IARresponse = BadRequest(ex.Message + "  in AdminController CheckProductNameIsExist()");
            }
            return IARresponse;
        }

        [HttpPost]
        [Route("AddorEditProductByAdmin")]
        public IActionResult AddorEditProductByAdmin([FromBody] Products_Types model)
        {
            IARresponse = Unauthorized();

            Products_Types product = new Products_Types();

            try
            {
                product.PID = model.PID;
                product.pName = model.pName;
                product.IsActive = 1;

                if (objadmindb.AddorEditProductByAdmin(product) == "")
                {
                    IARresponse = Ok(new { res = "Products Added / Updated Successfully" });
                }
                else
                {
                    IARresponse = BadRequest(new { res = "Products not Added / Updated... try again later!.." + objadmindb.AddorEditProductByAdmin(product) });
                }
            }
            catch (Exception ex)
            {

                IARresponse = BadRequest(new { res = ex.Message });

            }
            return IARresponse;
        }


        [HttpPost]
        [Route("DeleteProductByAdmin")]
        public IActionResult DeleteProductByAdmin([FromBody] int pid)
        {
            IARresponse = BadRequest();
            try
            {
                if (objadmindb.DeleteProductByAdmin(pid) == "")
                {
                    IARresponse = Ok(new { res = "Product Deleted Successfully" });
                }
                else
                {
                    IARresponse = BadRequest(new { res = "Product not Deleted... try again later!.." + objadmindb.DeleteProductByAdmin(pid) });
                }
            }
            catch (Exception ex)
            {
                IARresponse = BadRequest(new { res = ex.Message });
            }
            return IARresponse;
        }

        [HttpPost]
        [Route("ChangeProductStatusByAdmin")]
        public IActionResult ChangeProductStatusByAdmin([FromBody] string[] strPIDS)
        {
            IARresponse = BadRequest();
            string strpids = null;

            if (strPIDS.Length > 0)
            {
                for (int iArrCount = 0; iArrCount < strPIDS.Length; iArrCount++)
                {
                    if (strpids != null)
                    {
                        strpids += ',' + strPIDS[iArrCount].ToString();
                    }
                    else
                    {
                        strpids += strPIDS[iArrCount].ToString();
                    }

                }
            }

            try
            {

                if (objadmindb.ChangeVenderStatusByAdmin(strpids) == "")
                {
                    IARresponse = Ok(new { res = "" });
                }
                else
                {
                    IARresponse = BadRequest(new { res = "Try Again later!.." + objadmindb.ChangeProductStatusByAdmin(strpids) });

                }
            }
            catch (Exception ex)
            {
                IARresponse = BadRequest(new { res = ex.Message });
            }
            return IARresponse;
        }


        [HttpGet]
        [Route("GeyAllProducts_CategoryByActiveStatus/{IsActive}")]
        public IActionResult GeyAllProducts_CategoryByActiveStatus(int IsActive)
        {
            IARresponse = BadRequest();

            try
            {

                vds = objadminDb.GeyAllProducts_CategoryByActiveStatus(IsActive);

                if (vds != null)
                {
                    IARresponse = Ok(new
                    {
                        categorydata = vds
                    });
                }
            }
            catch (Exception ex)
            {

                IARresponse = BadRequest(ex.Message + "  in AdminController GeyAllProducts_CategoryByActiveStatus()");

            }
            return IARresponse;

        }

        [HttpGet]
        [Route("GeyAllProducts_SubcategoryByActiveStatus/{IsActive}")]
        public IActionResult GeyAllProducts_SubcategoryByActiveStatus(int IsActive)
        {
            IARresponse = BadRequest();

            try
            {

                vds = objadminDb.GeyAllProducts_SubcategoryByActiveStatus(IsActive);

                if (vds != null)
                {
                    IARresponse = Ok(new
                    {
                        scategorydata = vds
                    });
                }
            }
            catch (Exception ex)
            {

                IARresponse = BadRequest(ex.Message + "  in AdminController GeyAllProducts_SubcategoryByActiveStatus()");

            }
            return IARresponse;

        }


        [HttpGet]
        [Route("GeyAllProducts_Category_SubcategoryList")]
        public IActionResult GeyAllProducts_Category_SubcategoryList()
        {
            IARresponse = BadRequest();

            try
            {

                vds = objadminDb.GeyAllProducts_Category_SubcategoryList();

                if (vds != null)
                {
                    IARresponse = Ok(new
                    {
                        productdata = vds
                    });
                }
            }
            catch (Exception ex)
            {

                IARresponse = BadRequest(ex.Message + "  in AdminController GeyAllProducts_Category_SubcategoryList()");

            }
            return IARresponse;

        }


        [HttpPost]
        [Route("AddorEditCategoryByAdmin")]
        public IActionResult AddorEditCategoryByAdmin([FromBody] Products_Category model)
        {
            IARresponse = Unauthorized();

            Products_Category product_category = new Products_Category();

            try
            {
                product_category.prod_cat_id = model.prod_cat_id;
                product_category.pcName = model.pcName;
                product_category.PID = model.PID;
                product_category.IsActive = 1;

                if (objadmindb.AddorEditCategoryByAdmin(product_category) == "")
                {
                    IARresponse = Ok(new { res = "Products Added / Updated Successfully" });
                }
                else
                {
                    IARresponse = BadRequest(new { res = "Products not Added / Updated... try again later!.." + objadmindb.AddorEditCategoryByAdmin(product_category) });
                }
            }
            catch (Exception ex)
            {

                IARresponse = BadRequest(new { res = ex.Message });

            }
            return IARresponse;
        }


        [HttpPost]
        [Route("DeleteCategoryByAdmin")]
        public IActionResult DeleteCategoryByAdmin([FromBody] int pcid)
        {
            IARresponse = BadRequest();
            try
            {
                if (objadmindb.DeleteCategoryByAdmin(pcid) == "")
                {
                    IARresponse = Ok(new { res = "Category Deleted Successfully" });
                }
                else
                {
                    IARresponse = BadRequest(new { res = "Category not Deleted... try again later!.." + objadmindb.DeleteCategoryByAdmin(pcid) });
                }
            }
            catch (Exception ex)
            {
                IARresponse = BadRequest(new { res = ex.Message });
            }
            return IARresponse;
        }

        [HttpGet]
        [Route("GetAllCategories")]
        public Products_Category[] GetAllCategories()
        {
            var detials = new List<Products_Category>();
            TableData.Clear();
            TableData = objadminDb.GetAllCategories();
            detials.AddRange(from DataRow dt in TableData.Rows
                             select new Products_Category
                             {
                                 pcName = dt["pcName"].ToString(),
                                 prod_cat_id = Convert.ToInt32(dt["prod_cat_id"].ToString()),
                             });
            return detials.ToArray();
        }



        [HttpPost]
        [Route("AddorEditSubCategoryByAdmin")]
        public IActionResult AddorEditSubCategoryByAdmin([FromBody] Products_SubCategory model)
        {
            IARresponse = Unauthorized();

            Products_SubCategory product_subcategory = new Products_SubCategory();

            try
            {
                product_subcategory.prod_subcat_id = model.prod_subcat_id;
                product_subcategory.pscName = model.pscName;
                product_subcategory.prod_cat_id = model.prod_cat_id;
                product_subcategory.IsActive = 1;

                if (objadmindb.AddorEditSubCategoryByAdmin(product_subcategory) == "")
                {
                    IARresponse = Ok(new { res = "Products Added / Updated Successfully" });
                }
                else
                {
                    IARresponse = BadRequest(new { res = "Products not Added / Updated... try again later!.." + objadmindb.AddorEditSubCategoryByAdmin(product_subcategory) });
                }
            }
            catch (Exception ex)
            {

                IARresponse = BadRequest(new { res = ex.Message });

            }
            return IARresponse;
        }


        [HttpPost]
        [Route("DeleteSubCategoryByAdmin")]
        public IActionResult DeleteSubCategoryByAdmin([FromBody] int pscid)
        {
            IARresponse = BadRequest();
            try
            {
                if (objadmindb.DeleteSubCategoryByAdmin(pscid) == "")
                {
                    IARresponse = Ok(new { res = "Category Deleted Successfully" });
                }
                else
                {
                    IARresponse = BadRequest(new { res = "Category not Deleted... try again later!.." + objadmindb.DeleteSubCategoryByAdmin(pscid) });
                }
            }
            catch (Exception ex)
            {
                IARresponse = BadRequest(new { res = ex.Message });
            }
            return IARresponse;
        }

        [HttpGet]
        [Route("GeyAllOrdersDetails")]
        public IActionResult GeyAllOrdersDetails()
        {
            IARresponse = BadRequest();

            try
            {

                vds = objadminDb.GeyAllOrdersDetails();

                if (vds != null)
                {
                    IARresponse = Ok(new
                    {
                        ordersdata = vds
                    });
                }
            }
            catch (Exception ex)
            {

                IARresponse = BadRequest(ex.Message + "  in AdminController GeyAllOrdersDetails()");

            }
            return IARresponse;

        }

    }
}