using ListOut.ListDataDal;
using ListOut.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.SqlServer.Server;

namespace ListOut.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListController : ControllerBase
    {
        private readonly DataListDal _dal;

        public ListController(DataListDal dal)
        {
            _dal = dal;
        }

        [HttpPost("add")]

        public ActionResult<string> PostValues([FromBody] TodoItem content)
        {
            var dataresult = _dal.DataDal(content);

            return Ok(dataresult);
        }


    }
}
