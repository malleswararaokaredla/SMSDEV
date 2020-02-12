using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using SMSFCart.DAL;
using SMSFCart.BOL;
using System.IO;
//using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using SMSFCart.Models;
//using Newtonsoft.Json;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Authorization;


namespace SMSFCart.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class VendorController : ControllerBase
    {
        public IConfiguration IConfiguration { get; }
        private IHostingEnvironment _hostingEnvironment;
        
        public VendorController(IHostingEnvironment environment)
        {
            _hostingEnvironment = environment;
        }

        //EntryBs objEntry = new EntryBs();
        User vendor = new User();
        IActionResult IARresponse;
        VendorDb objVendorDb = new VendorDb();
        static CommonDbFunctions commonDb = new CommonDbFunctions();
        DataSet ds = new DataSet();
        //string Ext = "";
        string fname = "";
        string msg;
        

        DataTable TableData = new DataTable();
        [HttpPost]
        [Route("Register")]
        public IActionResult Register([FromBody] User model)
        {

            IARresponse = BadRequest();
            try
            {
                vendor.FirstName = model.FirstName;
                vendor.LastName = model.LastName;
                vendor.Email = model.Email;
                vendor.PhoneNo = model.PhoneNo;
                vendor.Gender = model.Gender;
                vendor.Password = model.Password;
                vendor.OTP = 0;//RandomNumForOTP.GetRandomString(6);
                if (model.Image != "")
                    vendor.Image = model.Image;
                vendor.RoleID = 2;
                //user.DOR = model.DOR;
                //vendor.VID = model.VID;
                //user.PID = model.PID;

                //if (model.IsActive != 0)
                //    vendor.IsActive = model.IsActive;
                //else
                vendor.IsActive = 0;

                if (model.Logo != "")
                    vendor.Logo = model.Logo;
                int vid = objVendorDb.Vendorregister(vendor);


                if (vid != 0)
                {
                    IARresponse = Ok(new { res = "Vendor Registed Successfully" });
                    if (model.Image != "")
                    {
                        string root = _hostingEnvironment.WebRootPath + "/vendor/pictures";
                        var fname = Path.GetFileName(vendor.Image);
                        var path = Path.Combine(root, fname);
                        //string[] arrfiles = Directory.GetFiles(HttpContext.Current.Server.MapPath("~/vendor/"));
                        string[] arrfiles = Directory.GetFiles(root);

                        //var files = HttpContext.Request.Form.Files;
                        string fileExt = Path.GetExtension(fname);

                        if (fname != null && fname.Length > 0)
                        {
                            var file = fname + "_" + vid + fileExt;

                            var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "vendor");
                            if (file.Length > 0)
                            {
                                //var fileName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(file);
                                var fileName = Path.GetExtension(file);
                                using (var fileStream = new FileStream(Path.Combine(root, file), FileMode.Create))
                                {
                                    //await file.CopyToAsync(fileStream);
                                    //employee.ImageName = fileName;
                                    vendor.Image = fileName;
                                }

                            }
                        }

                        foreach (string filename in arrfiles)
                        {
                            if (System.IO.File.Exists(filename))
                            {


                                if (fname == Path.GetFileName(filename))
                                {
                                    string fileNamenext = Path.GetFileNameWithoutExtension(filename);


                                    // FileInfo fffinfo = new FileInfo(Path.Combine(fileNamenext+vid+fileExt));

                                    FileInfo finfo = new FileInfo(filename);
                                    finfo.CopyTo(path + "_" + vid + fileExt, true);
                                    System.IO.File.Delete(filename);
                                }



                            }

                        }
                    }


                    if (model.Logo != "")
                    {
                        string lroot = _hostingEnvironment.WebRootPath + "/vendor/logo";
                        var lfname = Path.GetFileName(vendor.Logo);
                        var path = Path.Combine(lroot, lfname);
                        //string[] arrfiles = Directory.GetFiles(HttpContext.Current.Server.MapPath("~/vendor/"));
                        string[] arrfiles = Directory.GetFiles(lroot);

                        //var files = HttpContext.Request.Form.Files;
                        string lfileExt = Path.GetExtension(lfname);

                        if (lfname != null && lfname.Length > 0)
                        {
                            var lfile = lfname + "_" + vid + lfileExt;

                            var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "vendor/logo");
                            if (lfile.Length > 0)
                            {
                                //var fileName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(file);
                                var lfileName = Path.GetExtension(lfile);
                                using (var fileStream = new FileStream(Path.Combine(lroot, lfile), FileMode.Create))
                                {
                                    //await file.CopyToAsync(fileStream);
                                    //employee.ImageName = fileName;
                                    vendor.Logo = lfileName;
                                }

                            }
                        }

                        foreach (string lfilename in arrfiles)
                        {
                            if (System.IO.File.Exists(lfilename))
                            {


                                if (fname == Path.GetFileName(lfilename))
                                {
                                    string fileNamenext = Path.GetFileNameWithoutExtension(lfilename);


                                    // FileInfo fffinfo = new FileInfo(Path.Combine(fileNamenext+vid+fileExt));

                                    FileInfo finfo = new FileInfo(lfilename);
                                    finfo.CopyTo(path + "_" + vid + lfileExt, true);
                                    System.IO.File.Delete(lfilename);
                                }



                            }

                        }
                    }
                }



                else
                {
                    IARresponse = BadRequest(new { error = "Vendor Not registred... Try Again Later!.." + vid });
                }

            }
            catch (Exception ex)
            {
                IARresponse = BadRequest(new { error = ex.Message });



            }
            return IARresponse;
        }

        private string GetUniqueFileName(string fileName)
        {
            fileName = Path.GetFileName(fileName);
            return Path.GetFileNameWithoutExtension(fileName)
                      + "_"
                      + Guid.NewGuid().ToString().Substring(0, 4)
                      + Path.GetExtension(fileName);
        }


        [HttpGet, Route("getproduct")]
        public User[] getproduct()
        {
            var detials = new List<User>();
            TableData.Clear();
            TableData = objVendorDb.bindproduct();
            detials.AddRange(from DataRow dt in TableData.Rows
                             select new User
                             {
                                 PName = dt["PName"].ToString(),
                                 PID = Convert.ToInt32(dt["PID"].ToString()),
                             });
            return detials.ToArray();
        }


        [HttpGet, Route("getpcategories/{pid}")]
        public User[] getpcategories(int pid)
        {
            var detials = new List<User>();
            TableData.Clear();
            TableData = objVendorDb.bindpcategories(pid);
            detials.AddRange(from DataRow dt in TableData.Rows
                             select new User
                             {
                                 pcName = dt["pcName"].ToString(),
                                 prod_cat_id = Convert.ToInt32(dt["prod_cat_id"].ToString()),
                             });
            return detials.ToArray();
        }




        [HttpGet, Route("getpscategories/{prod_cat_id}")]
        public User[] getpscategories(int prod_cat_id)
        {
            var detials = new List<User>();
            TableData.Clear();
            if (prod_cat_id != 0)
            {
                TableData = objVendorDb.bindpscategories(prod_cat_id);
                detials.AddRange(from DataRow dt in TableData.Rows
                                 select new User
                                 {
                                     pscname = dt["pscname"].ToString(),
                                     prod_subcat_id = Convert.ToInt32(dt["prod_subcat_id"].ToString()),
                                 });
            }
            return detials.ToArray();
        }


        [HttpGet, Route("getpscategoriesbyvid/{prod_cat_id}/{vid}")]
        public User[] getpscategoriesbyvid(int prod_cat_id, int vid)
        {
            var detials = new List<User>();
            TableData.Clear();
            if (prod_cat_id != 0)
            {
                TableData = objVendorDb.bindsubcatbyvid(prod_cat_id, vid);
                detials.AddRange(from DataRow dt in TableData.Rows
                                 select new User
                                 {
                                     pscname = dt["pscname"].ToString(),
                                     prod_subcat_id = Convert.ToInt32(dt["prod_subcat_id"].ToString()),
                                 });
            }
            return detials.ToArray();
        }

        [HttpPost, Route("insproductname/{pName}")]
        public IActionResult insproductname(string pName)
        {
            IARresponse = BadRequest();
            string msg;
            msg = objVendorDb.inspname(pName);
            if (msg == "")

                IARresponse = Ok(new { res = "product name added successfully" });

            else
                IARresponse = BadRequest(new { err = "Try..again" });
            return IARresponse;

        }

        //sudha on 14/12
        [HttpGet]
        [Route("GetAllVendorsList")]
        public IActionResult GetAllVendorsList()
        {
            IARresponse = Unauthorized();
            string path = "";

            try
            {
                DataSet vds = new DataSet();

                vds = objVendorDb.GetAllVendors();

                if (vds != null)
                {

                    for (int iDSCount = 0; iDSCount < vds.Tables[0].Rows.Count; iDSCount++)
                    {
                        //Console.WriteLine(vds.Tables[0].Rows[iDSCount]["Image"].ToString());
                        if (vds.Tables[0].Rows[iDSCount]["Image"].ToString() != null)
                        {
                            path = _hostingEnvironment.WebRootPath + "/images/ProfilePhotos/" + vds.Tables[0].Rows[iDSCount]["Image"].ToString();
                            try
                            {
                                if (System.IO.File.Exists(path))
                                {
                                    byte[] b = System.IO.File.ReadAllBytes(path);
                                    vds.Tables[0].Rows[iDSCount]["Image"] = "data:image/png;base64," + Convert.ToBase64String(b);
                                }
                                else
                                {
                                    vds.Tables[0].Rows[iDSCount]["Image"] = null;
                                }
                            }
                            catch (FileNotFoundException ex)
                            {
                                vds.Tables[0].Rows[iDSCount]["Image"] = null;
                                Console.WriteLine(ex.Message + "  in VendorController GetAllVendors()");
                            }

                        }
                    }

                    IARresponse = Ok(new
                    {
                        vendordata = vds
                    });
                }
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.Message + "  in VendorController GetAllVendorsList()");

            }
            return IARresponse;

        }

        //eswar on 14/12
        [HttpPost]
        [Route("insproudetials/{vid}/{x}")]
        public IActionResult insproddetials(int vid, string x)
        {
            IARresponse = BadRequest();
            msg = objVendorDb.vendoritemadding(vid, x);
            if (msg == null || msg == "")
            {

                IARresponse = Ok(new { res = "product name added successfully" });
            }

            else
                IARresponse = BadRequest(new { err = "Try..again" });
            return IARresponse;
        }


        [HttpGet]
        [Route("getvendors")]
        public User[] gevendors()
        {
            var detials = new List<User>();
            TableData.Clear();
            TableData = objVendorDb.bindvendors();
            detials.AddRange(from DataRow dt in TableData.Rows
                             select new User
                             {
                                 LastName = dt["LastName"].ToString(),
                                 UID = Convert.ToInt32(dt["uid"].ToString()),
                                 FirstName = dt["FirstName"].ToString(),
                             });
            return detials.ToArray();
        }

        [HttpGet]
        [Route("getvendoritemdetials/{vid}")]


        public IActionResult getvendoritemdetials(int vid)
        {
            IARresponse = Unauthorized();

            List<User> list = new List<User>();
            try
            {
                list = objVendorDb.getvendoritemdetials(vid);

                if (list.Count > 0)
                {

                    IARresponse = Ok(
                     list
                    );
                }
                else
                {
                    IARresponse = Ok(list.Count);
                }
            }
            catch (Exception ex)
            {

                IARresponse = BadRequest(new { res = ex.Message });

            }
            return IARresponse;
        }
        //eswar on 1/3/2019
        [HttpPut]
        [Route("updproddetials/{vid}/{Vpid}/{prod_subcat_id}")]
        public IActionResult updproddetials(int vid, int Vpid, int prod_subcat_id)
        {
            IARresponse = BadRequest();
            msg = objVendorDb.updatevendoritems(vid, Vpid, prod_subcat_id);
            if (msg == null || msg == "")
            {
                IARresponse = Ok(new { res = "vendor items updated successfully" });

            }
            else
                IARresponse = BadRequest(new { err = "Try..again" });
            return IARresponse;
        }

        [HttpDelete]
        [Route("delvitem/{vpid}")]
        public IActionResult delvitem(int vpid)
        {
            IARresponse = BadRequest();
            msg = objVendorDb.delvitem(vpid);
            if (msg == null || msg == "")
            {
                IARresponse = Ok(new { res = "vendor items deleted successfully" });
            }
            else
                IARresponse = BadRequest(new { err = "Try..again" });
            return IARresponse;
        }

        [HttpPost]
        [Route("insvitemadd")]
        public int insvitemadd([FromBody]List<Vitem> vitem)
        {
            IARresponse = BadRequest();
            string name = RandomNamesForProfiles.GetRandomString(6);
            int x=0;
            string fileExt = Path.GetExtension(vitem[0].imgname);
            string extname = name + "" + fileExt;
            vitem[0].imgname = extname;

            x = objVendorDb.additemcatlog(vitem);
            for (int i = 0; i < vitem.Count; i++)
            {
                
               
                if (x!=0) 
                {
                    IARresponse = Ok(new { res = "items added successfully" });
                
                        if (vitem[0].cat_img != "" )
                        {
                        if (i == 0)
                        {
                            
                            

                            string root = _hostingEnvironment.WebRootPath + "/images/Products/ProductsCategory/ProductsSubCategory/itemimg";
                            //var fname = Path.GetFileName(vitem.cat_img);

                            var path = Path.Combine(root, extname);
                            //string[] arrfiles = Directory.GetFiles(HttpContext.Current.Server.MapPath("~/vendor/"));
                            string[] arrfiles = Directory.GetFiles(root);

                            //var files = HttpContext.Request.Form.Files;



                            //Check if directory exist
                            if (!System.IO.Directory.Exists(root))
                            {
                                System.IO.Directory.CreateDirectory(root); //Create directory if it doesn't exist
                            }
                            var file = x + "_" + vitem[0].imgname;
                            //string name = RandomNamesForProfiles.Encryptword(file);
                            byte[] imageBytes = Convert.FromBase64String(vitem[0].cat_img);
                            string pathname = x + "_" + name;

                            System.IO.File.WriteAllBytes(path, imageBytes);

                            IARresponse = Ok(new { res = "Vendor Items added Successfully" });

                            foreach (string filename in arrfiles)
                            {
                                if (System.IO.File.Exists(filename))
                                {


                                    if (fname == Path.GetFileName(filename))
                                    {
                                        string fileNamenext = Path.GetFileNameWithoutExtension(filename);


                                        // FileInfo fffinfo = new FileInfo(Path.Combine(fileNamenext+vid+fileExt));

                                        FileInfo finfo = new FileInfo(filename);
                                        finfo.CopyTo(path + "_" + x + fileExt, true);
                                        System.IO.File.Delete(filename);
                                    }



                                }

                            }
                        }
                        }
                    
                    if (i != 0)
                    {
                        string catname = RandomNamesForProfiles.GetRandomString(6);
                        string fxt = Path.GetExtension(vitem[i].catimgname);
                        string ext = catname + "" + fxt;
                        vitem[i].catimgname = ext;

                        if (vitem[i].catlog_img != "")
                        {
                            string root = _hostingEnvironment.WebRootPath + "/images/Products/ProductsCategory/ProductsSubCategory/itemimg/Catloges";
                            //var fname = Path.GetFileName(vitem.cat_img);

                            var path = Path.Combine(root, ext);
                            //string[] arrfiles = Directory.GetFiles(HttpContext.Current.Server.MapPath("~/vendor/"));
                            string[] arrfiles = Directory.GetFiles(root);

                            //var files = HttpContext.Request.Form.Files;



                            //Check if directory exist
                            if (!System.IO.Directory.Exists(root))
                            {
                                System.IO.Directory.CreateDirectory(root); //Create directory if it doesn't exist
                            }
                            var file = x + "_" + vitem[i].catimgname;
                            //string name = RandomNamesForProfiles.Encryptword(file);
                            byte[] imageBytes = Convert.FromBase64String(vitem[i].catlog_img);
                            string pathname = x + "_" + catname;

                            System.IO.File.WriteAllBytes(path, imageBytes);

                            foreach (string filename in arrfiles)
                            {
                                if (System.IO.File.Exists(filename))
                                {


                                    if (fname == Path.GetFileName(filename))
                                    {
                                        string fileNamenext = Path.GetFileNameWithoutExtension(filename);


                                        // FileInfo fffinfo = new FileInfo(Path.Combine(fileNamenext+vid+fileExt));

                                        FileInfo finfo = new FileInfo(filename);
                                        finfo.CopyTo(path + "_" + x + fxt, true);
                                        System.IO.File.Delete(filename);
                                    }



                                }

                            }
                        }
                    }
                }

                else
                    IARresponse = BadRequest(new { err = "Try..again" });
            }
          
          

            return x;
        }


        [HttpPost("insimgcats")]
        public int insimgcats([FromBody]Vitem vitem)
        {
            IARresponse = BadRequest();
            string name = RandomNamesForProfiles.GetRandomString(6);
            string fileExt = Path.GetExtension(vitem.imgname);
            string extname = name + "" + fileExt;
            vitem.imgname = extname;
            int i = objVendorDb.vitemadding(vitem);

            if (i != 0)
            {

                IARresponse = Ok(new { res = "items added successfully" });

                if (vitem.cat_img != "")
                {

                    CommonModel model = new CommonModel();

                    string root = _hostingEnvironment.WebRootPath + "/images/Products/ProductsCategory/ProductsSubCategory/itemimg";
                    //var fname = Path.GetFileName(vitem.cat_img);

                    var path = Path.Combine(root, extname);
                    //string[] arrfiles = Directory.GetFiles(HttpContext.Current.Server.MapPath("~/vendor/"));
                    string[] arrfiles = Directory.GetFiles(root);

                    //var files = HttpContext.Request.Form.Files;



                    //Check if directory exist
                    if (!System.IO.Directory.Exists(root))
                    {
                        System.IO.Directory.CreateDirectory(root); //Create directory if it doesn't exist
                    }

                    var file = i + "_" + vitem.imgname;
                    //string name = RandomNamesForProfiles.Encryptword(file);
                    byte[] imageBytes = Convert.FromBase64String(vitem.cat_img);
                    string pathname = i + "_" + name;

                    System.IO.File.WriteAllBytes(path, imageBytes);

                    IARresponse = Ok(new { res = "Vendor Items added Successfully" });


                    //if (vitem.imgname != null && vitem.imgname.Length > 0)
                    //{
                    //    var file = i + "_" + vitem.imgname;
                    //    //string name = RandomNamesForProfiles.Encryptword(file);
                    //    byte[] imageBytes = Convert.FromBase64String(vitem.cat_img);

                    //    System.IO.File.WriteAllBytes(path, imageBytes);
                    //    var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "images");
                    //    //if (file.Length > 0)
                    //    //{
                    //    //    //var fileName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(file);
                    //    //    var fileName = Path.GetExtension(file);
                    //    //    using (var fileStream = new FileStream(Path.Combine(root, file), FileMode.Create))
                    //    //    {

                    //    //        vitem.cat_img = fileName;
                    //    //    }

                    //    //}
                    //}

                    foreach (string filename in arrfiles)
                    {
                        if (System.IO.File.Exists(filename))
                        {


                            if (fname == Path.GetFileName(filename))
                            {
                                string fileNamenext = Path.GetFileNameWithoutExtension(filename);


                                // FileInfo fffinfo = new FileInfo(Path.Combine(fileNamenext+vid+fileExt));

                                FileInfo finfo = new FileInfo(filename);
                                finfo.CopyTo(path + "_" + i + fileExt, true);
                                System.IO.File.Delete(filename);
                            }



                        }

                    }
                }
            }
            else
                IARresponse = BadRequest(new { err = "Try..again" });
            return i;
        }

        [HttpGet]
        [Route("getvendorwiseitems/{vid}")]


        public IActionResult getvendorwiseitems(int vid)
        {
            IARresponse = Unauthorized();

            List<Vitem> list = new List<Vitem>();
            try
            {

                list = objVendorDb.getvendorwiseitems(vid);


                if (list.Count > 0)
                {

                    IARresponse = Ok(
                     list
                    );
                }
                else
                {
                    IARresponse = Ok(list.Count);
                }
            }
            catch (Exception ex)
            {

                IARresponse = BadRequest(new { res = ex.Message });

            }
            return IARresponse;
        }
        [HttpGet]
        [Route("getvenitems/{vid}")]
        public Vitem[] getvenitems(int vid)
        {
            string path = "";
            string data = "";
            var detials = new List<Vitem>();
            TableData.Clear();
            TableData = objVendorDb.vendorwiseitems(vid);

            string root = _hostingEnvironment.WebRootPath + "/images/Products/ProductsCategory/ProductsSubCategory/itemimg/";
            //Check if directory exist
            if (!System.IO.Directory.Exists(root))
            {
                System.IO.Directory.CreateDirectory(root); //Create directory if it doesn't exist
            }

            foreach (DataRow row in TableData.Rows)
            {
                path = _hostingEnvironment.WebRootPath + "/images/Products/ProductsCategory/ProductsSubCategory/itemimg/" + row["cat_img"].ToString();

                if (System.IO.File.Exists(path))
                {
                    byte[] s = System.IO.File.ReadAllBytes(path);
                    data = "data:image/png;base64," + Convert.ToBase64String(s);
                    row["cat_img"] = data;
                }
                else
                {
                    row["cat_img"] = "NO_IMAGE_PH.png";
                }

                //byte[] s = System.IO.File.ReadAllBytes(path);
                //data = "data:image/png;base64," + Convert.ToBase64String(s);
                //row["cat_img"] = data;
            }

            detials.AddRange(from DataRow ds in TableData.Rows
                             select new Vitem
                             {
                                 itm_id = Convert.ToInt32(ds["itm_id"].ToString()),
                                 itemname = ds["it_name"].ToString(),
                                 cat_img = ds["cat_img"].ToString(),
                                 pscName = ds["pscName"].ToString(),
                                 pcName = ds["pcName"].ToString(),
                                 PName = ds["PName"].ToString(),
                             });
            return detials.ToArray();

        }

        [HttpGet]
        [Route("getitemsize")]
        public Vitemdesc[] getitemsize()
        {
            var detials = new List<Vitemdesc>();
            TableData.Clear();
            TableData = objVendorDb.getitemsize();
            detials.AddRange(from DataRow dt in TableData.Rows
                             select new Vitemdesc
                             {

                                 itm_sz_id = Convert.ToInt32(dt["itm_sz_id"].ToString()),
                                 itm_size = dt["itm_size"].ToString(),
                             });
            return detials.ToArray();
        }

        [HttpGet]
        [Route("getmaterialtype")]
        public Vitemdesc[] getmaterialtype()
        {
            var detials = new List<Vitemdesc>();
            TableData.Clear();
            TableData = objVendorDb.getmaterialtype();
            detials.AddRange(from DataRow dt in TableData.Rows
                             select new Vitemdesc
                             {

                                 item_mid = Convert.ToInt32(dt["item_mid"].ToString()),
                                 material_type = dt["material_type"].ToString(),
                             });
            return detials.ToArray();
        }
        [HttpGet]
        [Route("getmaterialworktype")]
        public Vitemdesc[] getmaterialworktype()
        {
            var detials = new List<Vitemdesc>();
            TableData.Clear();
            TableData = objVendorDb.getmaterialwork();
            detials.AddRange(from DataRow dt in TableData.Rows
                             select new Vitemdesc
                             {

                                 itm_wtid = Convert.ToInt32(dt["itm_wtid"].ToString()),
                                 worktype = dt["worktype"].ToString(),
                             });
            return detials.ToArray();
        }

        [HttpGet]
        [Route("getbrands")]
        public Vitemdesc[] getbrands()
        {
            var detials = new List<Vitemdesc>();
            TableData.Clear();
            TableData = objVendorDb.getbrands();
            detials.AddRange(from DataRow dt in TableData.Rows
                             select new Vitemdesc
                             {

                                 bid = Convert.ToInt32(dt["bid"].ToString()),
                                 Bname = dt["Bname"].ToString(),
                             });
            return detials.ToArray();
        }
        [HttpGet]
        [Route("getvitemname/{vid}/{pscid}")]
        public Vitemdesc[] getvitemname(int vid, int pscid)
        {
            var detials = new List<Vitemdesc>();
            TableData.Clear();
            TableData = objVendorDb.getitemname(vid, pscid);
            detials.AddRange(from DataRow dt in TableData.Rows
                             select new Vitemdesc
                             {

                                 itm_id = Convert.ToInt32(dt["itm_id"].ToString()),
                                 it_name = dt["it_name"].ToString(),
                             });
            return detials.ToArray();
        }

        [HttpGet, Route("getcategories")]
        public User[] getcategories()
        {
            var detials = new List<User>();
            TableData.Clear();
            TableData = objVendorDb.bindcategories();
            detials.AddRange(from DataRow dt in TableData.Rows
                             select new User
                             {
                                 pscname = dt["pscName"].ToString(),
                                 prod_subcat_id = Convert.ToInt32(dt["prod_subcat_id"].ToString()),
                                 prod_cat_id = Convert.ToInt32(dt["prod_cat_id"].ToString()),
                             });
            return detials.ToArray();
        }

        [Authorize]
        [HttpPost]
        [Route("insitemsdesc")]
        public IActionResult insitemsdesc( [FromBody] List<Vitemdesc> model)
        {
            IARresponse = Unauthorized();
      
            try
            {
              objVendorDb.AddingitemdesList(model);
                IARresponse = Ok(new { res = "item Details Added Successfully" });
            }
            catch (Exception ex)
            {
                IARresponse = BadRequest(new { err = "Try..again"+ex });
            }
            return IARresponse;
        }

        [HttpGet]
        [Route("getdescitem/{vid}")]
        public Vitemdesc[] getdescitem(int vid)
        {
            var detials = new List<Vitemdesc>();
            TableData.Clear();
            TableData = objVendorDb.getdescitems(vid);
            detials.AddRange(from DataRow dt in TableData.Rows
                             select new Vitemdesc
                             {
                                 it_name = dt["it_name"].ToString(),
                                 itm_descp = dt["itm_descp"].ToString(),
                                 Bname = dt["Bname"].ToString(),
                                 price =Convert.ToSingle(dt["price"].ToString()),
                                 color = dt["color"].ToString(),
                                 material_type = dt["material_type"].ToString(),
                                 quantity =Convert.ToInt32(dt["quantity"].ToString()),
                                 shipping_charges =Convert.ToInt32(dt["shipping_charges"].ToString()),
                                 offer =Convert.ToInt32(dt["offer"].ToString()),
                                 itm_size=dt["itm_size"].ToString()
                             });
            return detials.ToArray();
        }

    }

   


}
