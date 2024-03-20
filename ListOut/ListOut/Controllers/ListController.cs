using Dapper;
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

        //for add api/List/add
        [HttpPost("add")]

        public ActionResult<string> PostValues([FromBody] TodoItem content)
        {
            var dataresult = _dal.DataDal(content);

            return Ok(dataresult);
        }

        //for delete api/List/delete/id
        [HttpPost("delete")]
        public IActionResult DeleteTask([FromBody] TodoItem Id)
        {
            var deleteresult = _dal.DeleteDataDal(Id);

            return Ok(deleteresult);
           
        }

        [HttpPost("edit")]

        public ActionResult<string> EditTask([FromBody] TodoItem content)
        {
            var editresult = _dal.EditDal(content);

            return Ok(editresult);
        }

    }
}
