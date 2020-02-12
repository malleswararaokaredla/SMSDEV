using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SMSFCart.BOL;
using Microsoft.Extensions.Configuration;
using SMSFCart.DAL;
using System.Data;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using SMSFCart.Models;
using Microsoft.AspNetCore.Authorization;

namespace SMSFCart.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        //private string ImageFolder = "images/ProfilePhotos";

//test
        public UserController(IConfiguration configuration, IHostingEnvironment hostingEnvironment)
        {
            Configuration = configuration;
            _hostingEnvironment = hostingEnvironment;
        }

        public IConfiguration Configuration { get; }

        UserDb userdb = new UserDb();

        User user = new User();
        DataSet ds = new DataSet();
        IActionResult IARresponse;

        [HttpGet("{id}")]
        [Route("getuserdatabyid")]


        public IActionResult Get(int id)
        {
            IARresponse = Unauthorized();
            string path="";
            try
            {
                user = userdb.GetUserDataById(id);


                if (user != null)
                {
                    if(user.Image!="")
                    {
                        path = _hostingEnvironment.WebRootPath + "/images/ProfilePhotos/" + user.Image;

                        try
                        {
                            if(System.IO.File.Exists(path))
                            {
                                byte[] b = System.IO.File.ReadAllBytes(path);
                                user.Image = "data:image/png;base64," + Convert.ToBase64String(b);
                            }
                            else
                            {
                                user.Image = null;
                            }
                          
                        }
                        catch(FileNotFoundException ex)
                        {
                            user.Image = null;
                            Console.WriteLine(ex.Message + "  in UserController Get()");
                        }
                    }
                   
                    
                    IARresponse = Ok(new
                    {
                        userdata = user
                    });
                }
                else
                {
                    IARresponse = BadRequest("User Not Exists... Please Register");
                }


            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.Message + "  in EntryController Login()");

            }
             return IARresponse;
        }

        //UpdateUserPersonalData
        [HttpPost]
        [Route("Updateuserpersnldata")]
        public IActionResult Updateuserpersnldata([FromBody] User model)
        {
            IARresponse = Unauthorized();

            try
            {
                if ((userdb.UpdateUserPersonalData(model)) == "")
                {
                    IARresponse = Ok(new { res= "User Personal Data Updated Successfully" });
                }
                else
                {
                    IARresponse = BadRequest(new { res = "User Not Updated... Try Again Later!.." });
                }
            }
            catch (Exception ex)
            {
                IARresponse = BadRequest(new { res = ex.Message });
                //Console.WriteLine(ex.Message + "  in EntryController Register()");

            }
            return IARresponse;
        }

      
        [HttpPost]
        [Route("updatepassword")]
        public IActionResult UpdatePassword(CommonModel model)
        {
            IARresponse = Unauthorized();

            try
            {
                if ((userdb.UpdatePassword(model.uid, model.CName)) == "")
                {
                    IARresponse = Ok(new { res = "User password Updated Successfully" });
                }
                else
                {
                    IARresponse = BadRequest(new { res = "User Not Updated... Try Again Later!.." });
                }
            }
            catch (Exception ex)
            {

                IARresponse = BadRequest(new { res = ex.Message });

            }
            return IARresponse;
        }

        [HttpPost]
        [Route("UpdateProfilePhoto")]
        public IActionResult UpdateProfilePhoto([FromBody] CommonModel model)
        {

            //UpdateProfilePic
            IARresponse = Unauthorized();
           

            try
            {
                string name = RandomNamesForProfiles.GetRandomString(6);
                string path = _hostingEnvironment.WebRootPath + "/images/ProfilePhotos";

                //Check if directory exist
                if (!System.IO.Directory.Exists(path))
                {
                    System.IO.Directory.CreateDirectory(path); //Create directory if it doesn't exist
                }
                string imageName = name + ".jpg";
                string imgPath = Path.Combine(path, imageName);
                byte[] imageBytes = Convert.FromBase64String(model.CName);

                System.IO.File.WriteAllBytes(imgPath, imageBytes);

                if ((userdb.UpdateProfilePic(model.uid, imageName)) == "")
                {
                    IARresponse = Ok(new { res = "User ProfilePic Updated Successfully" });
                }
                else
                {
                    IARresponse = BadRequest(new { res = "Profile Photot Not Updated... Try Again Later!.." });
                }
            }
            catch (Exception ex)
            {

                IARresponse = BadRequest(new { res = ex.Message });

            }
            return IARresponse;

        }




        //sudha on 19/12
        [HttpGet]
        [Route("GetAllUsersList")]
        public IActionResult GetAllUsersList()
        {
            IARresponse = Unauthorized();
            string path = "";

            UserDb objuserDb = new UserDb();

            try
            {
                DataSet uds = new DataSet();

                uds = objuserDb.GetAllUsers();

                if (uds != null)
                {

                    for (int iDSCount = 0; iDSCount < uds.Tables[0].Rows.Count; iDSCount++)
                    {
                        //Console.WriteLine(vds.Tables[0].Rows[iDSCount]["Image"].ToString());
                        if (uds.Tables[0].Rows[iDSCount]["Image"].ToString() != null)
                        {
                            path = _hostingEnvironment.WebRootPath + "/images/ProfilePhotos/" + uds.Tables[0].Rows[iDSCount]["Image"].ToString();
                            try
                            {
                                if (System.IO.File.Exists(path))
                                {
                                    byte[] b = System.IO.File.ReadAllBytes(path);
                                    uds.Tables[0].Rows[iDSCount]["Image"] = "data:image/png;base64," + Convert.ToBase64String(b);
                                }
                                else
                                {
                                    uds.Tables[0].Rows[iDSCount]["Image"] = null;
                                }
                            }
                            catch (FileNotFoundException ex)
                            {
                                uds.Tables[0].Rows[iDSCount]["Image"] = null;
                                Console.WriteLine(ex.Message + "  in UserController GetAllUsersList()");
                            }

                        }
                    }

                    IARresponse = Ok(new
                    {
                        userdata = uds
                    });
                }
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.Message + "  in UserController GetAllUsersList()");

            }
            return IARresponse;

        }
    }
}