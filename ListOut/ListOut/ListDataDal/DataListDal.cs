using System.Data;
using Dapper;
using ListOut.Data;
using ListOut.Models;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;

namespace ListOut.ListDataDal
{
    public class DataListDal
    {
        private readonly DapperContext _context;

        public DataListDal(DapperContext context)
        {
            _context = context;
        }

        public string DataDal(TodoItem content)
        {
            if (content == null) 
            {
                var result = new
                {
                    status = "Failed"
                };

                return JsonConvert.SerializeObject(result);
            }
            else
            {
                using (var connection = _context.CreateConnection())
                {
                    connection.Open();
                    var query = @"INSERT INTO TaskMain (Task_Name) OUTPUT INSERTED.ID, INSERTED.Task_Name VALUES (@content)";
                    var parameters = new DynamicParameters();
                    parameters.Add("@content", content.Task_Name);

                    var insertedRecord = connection.Query<TodoItem>(query, parameters).SingleOrDefault();

                    if (insertedRecord != null)
                    {
                        var result = new
                        {
                            status = "Ok",
                            id = insertedRecord.Id,
                            content = insertedRecord.Task_Name
                        };

                        return JsonConvert.SerializeObject(result);
                    }
                    else
                    {
                        var result = new
                        {
                            status = "Failed"
                        };

                        return JsonConvert.SerializeObject(result);
                    }

                    //var result = connection.Execute(query, parameters);
                    //return $"Test Done, {result} rows affected.";
                }
            }
        }
     
    }
}
