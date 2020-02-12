using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SMSFCart.BOL;
using SMSFCart.DAL;

namespace SMSFCart.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {

        public AddressController(IConfiguration configuration)
        {
            Configuration = configuration;         
        }

        public IConfiguration Configuration { get; }

        AddressDb addrsdb = new AddressDb();

        AddressModel adm = new AddressModel();
        DataSet ds = new DataSet();
        IActionResult IARresponse;

        [HttpGet("{id}")]
        [Route("getuseradddatabyid")]


        public IActionResult Get(int id)
        {
            IARresponse = Unauthorized();         
            List<AddressModel> list = new List<AddressModel>();
            try
            {
                list = addrsdb.GetUserAddressDataById(id);

                if (list.Count>0)
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


        [HttpPost]
        [Route("AddAddressDetailsByid")]
        public IActionResult AddAddressDetailsByid([FromBody] AddressModel model)
        {

            IARresponse = Unauthorized();

            try
            {
                addrsdb.AddingAddressDetails(model);
                IARresponse = Ok(new { res = "Address Details Added Successfully" });
            }
            catch(Exception ex)
            {
                IARresponse = BadRequest(new { res = ex.Message });
            }
            return IARresponse;
        }


        [HttpPost]
        [Route("AddingAddressList")]

        public IActionResult AddingListAddressById([FromBody] List<AddressModel> model)
        {
            IARresponse = Unauthorized();

            try
            {
                addrsdb.AddingAddressDetailsList(model);
                IARresponse = Ok(new { res = "Address Details Added Successfully" });
            }
            catch (Exception ex)
            {
                IARresponse = Ok(new { error = ex.Message });
            }
            return IARresponse;
        }

        [HttpPost]
        [Route("UpdateAddressById")]
        public IActionResult UpdateAddressById([FromBody] AddressModel model)
        {
            IARresponse = Unauthorized();

            try
            {
                addrsdb.UpdateAddressById(model);
                IARresponse = Ok(new { res = "Details Update Successfully" });
            }
            catch (Exception ex)
            {
             IARresponse = BadRequest(new { res = ex.Message });
            }
            return IARresponse;
        }

        [HttpPost]
        [Route("deleteAddressById")]
        public IActionResult DeleteAddressById([FromBody] AddressModel model)
        {
            IARresponse = Unauthorized();

            try
            {
                addrsdb.DleteAddressById(model.UID,model.AID);
                IARresponse = Ok(new { res = "Address Details Deleted Successfully" });
            }
            catch (Exception ex)
            {
                IARresponse = BadRequest(new { res = ex.Message });
            }
            return IARresponse;
        }
    }
}