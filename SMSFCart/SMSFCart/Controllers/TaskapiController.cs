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

namespace SMSFCart.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class TaskapiController : Controller
    {
        DBConnection db = new DBConnection();

        private readonly IHostingEnvironment _hostingEnvironment;
        // private string ImageFolder = "images/ProfilePhotos";


        public TaskapiController(IConfiguration configuration, IHostingEnvironment hostingEnvironment)
        {
            Configuration = configuration;
            _hostingEnvironment = hostingEnvironment;
        }

        public IConfiguration Configuration { get; }

        //EntryBs objEntry = new EntryBs();
        User user = new User();
        IActionResult IARresponse;

        EntryDb objEntityDb = new EntryDb();

        DataSet ds = new DataSet();

        [HttpPost, Route("AVLogin/{strEmail}/{strPassword}")]
        public IActionResult AVLogin(string strEmail, string strPassword)
        {
            IARresponse = Unauthorized();

            if (Configuration.GetSection("Appkey").Value == "xyz123")
            {
                string msg = objEntityDb.taskloginstring(strEmail, strPassword);
            }
            return IARresponse;
        }
    }
}