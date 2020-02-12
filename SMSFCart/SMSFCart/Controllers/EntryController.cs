using Microsoft.AspNetCore.Mvc;

using SMSFCart.BOL;
using System;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.Data;
using SMSFCart.DAL;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authorization;

namespace SMSFCart.Controllers
{
   

    [Route("api/[controller]")]
    [ApiController]
    public class EntryController : ControllerBase
    {

        DBConnection db = new DBConnection();

        private readonly IHostingEnvironment _hostingEnvironment;
       // private string ImageFolder = "images/ProfilePhotos";


        public EntryController(IConfiguration configuration, IHostingEnvironment hostingEnvironment)
        {
            Configuration = configuration;
            _hostingEnvironment = hostingEnvironment;
        }

        public IConfiguration Configuration { get;  }

        //EntryBs objEntry = new EntryBs();
        User user = new User();
        IActionResult IARresponse;

        EntryDb objEntityDb = new EntryDb();

        DataSet ds = new DataSet();

       
        [HttpPost]
        [Route("Register")]
        public IActionResult Register([FromBody] User model)
        {
            
            IARresponse = BadRequest();
           try
            {
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Email = model.Email;
            user.PhoneNo = model.PhoneNo;
            user.Gender = model.Gender;
            user.Address = "";
            user.Password = model.Password;
            user.OTP = 0;//RandomNumForOTP.GetRandomString(6);
            user.Image = "";
            user.RoleID = 3;

            if (objEntityDb.Register(user)=="")
            {
                IARresponse = Ok(new {res= "User Registed Successfully" });
            }
            else
            {
                IARresponse = BadRequest(new { res = "User Not registred... Try Again Later!.." + objEntityDb.Register(user) });
            }
            }
            catch (Exception ex)
            {

                IARresponse = BadRequest(new { res = ex.Message });

            }
            return IARresponse;
        }

       
        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] User model)
        {        
            IARresponse = Unauthorized();

            //user.Email = model.Email;
            //user.Password = model.Password;
            ds = objEntityDb.Login(model);
            try
            {
              
                if (ds.Tables[0].Rows.Count !=0)
                {

                    var claims = new[]
                       {
                        new Claim(JwtRegisteredClaimNames.Sub,model.Email),
                        new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
                       };

                    var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:key"]));
                    var token = new JwtSecurityToken(

                   issuer: Configuration["JWT:issuer"],
                   audience: Configuration["JWT:audience"],
                   expires: DateTime.UtcNow.AddMinutes(10),
                   claims: claims,
                   signingCredentials: new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256));
                   IARresponse = Ok(new
                    {
                        token = new JwtSecurityTokenHandler().WriteToken(token),
                        expiration = token.ValidTo,                        
                        UserName = ds.Tables[0].Rows[0]["name"].ToString(),
                         UID= ds.Tables[0].Rows[0]["UID"].ToString(),
                         Email= ds.Tables[0].Rows[0]["Email"].ToString(),
                         phone= ds.Tables[0].Rows[0]["PhoneNo"].ToString(),
                         roleid= ds.Tables[0].Rows[0]["RoleID"].ToString()
                   });
                }
                else
                {
                    IARresponse = BadRequest(new { res = "User Not Exists... Please Register" });
                }


            }
            catch (Exception ex)
            {

                IARresponse = BadRequest(new { res = ex.Message });

            }
            return IARresponse;
        }

        [HttpPost]
        [Route("CheckMail")]
        public bool CheckMail([FromBody] string Email)
        {
            bool res = false;
            IARresponse = BadRequest();
            try
            {
                res = objEntityDb.CheckEmail(Email);
                IARresponse = Ok(new { res });
            }
            catch(Exception ex)
            {
                IARresponse = BadRequest(ex.Message + "  in EntryController CheckMail()");
            }
            return res;
        }

        [HttpPost, Route("AVLogin/{strEmail}/{strPassword}")]

        public IActionResult AVLogin(string strEmail, string strPassword)
        {
            IARresponse = Unauthorized();
            
           
            ds = objEntityDb.AVLogin(strEmail, strPassword);
            try
            {

                if (ds.Tables[0].Rows.Count != 0)
                {

                    var claims = new[]
                       {
                        new Claim(JwtRegisteredClaimNames.Sub,strEmail),
                        new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
                       };

                    var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:key"]));
                    var token = new JwtSecurityToken(

                   issuer: Configuration["JWT:issuer"],
                   audience: Configuration["JWT:audience"],
                   expires: DateTime.UtcNow.AddMinutes(10),
                   claims: claims,
                   signingCredentials: new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256));
                    IARresponse = Ok(new
                    {
                        token = new JwtSecurityTokenHandler().WriteToken(token),
                        expiration = token.ValidTo,
                        UserName = ds.Tables[0].Rows[0]["name"].ToString(),
                        UID = ds.Tables[0].Rows[0]["UID"].ToString(),
                        Email = ds.Tables[0].Rows[0]["Email"].ToString(),
                        RID = ds.Tables[0].Rows[0]["RoleID"].ToString()
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

        [HttpGet]
        [Route("GetStorelogo")]
        public IActionResult GetLogo()
        {
            IARresponse = BadRequest();
            string path = "";
            string data = "";
            try
            {
                path = _hostingEnvironment.WebRootPath + "/images/Logo/mainlogo3.jpeg";
                byte[] b = System.IO.File.ReadAllBytes(path);
                data = "data:image/png;base64," + Convert.ToBase64String(b);

                IARresponse = Ok(new
                {
                    imgdata = data
                });
            }
            catch (Exception ex)
            {

                IARresponse = BadRequest(new { res = ex.Message });

            }
            return IARresponse;

        }
    
    }
}
