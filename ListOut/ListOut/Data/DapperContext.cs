using Microsoft.Data.SqlClient;

namespace ListOut.Data
{
    public class DapperContext
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public DapperContext(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("dbConnection");
        }

        public SqlConnection CreateConnection()
            => new SqlConnection(_connectionString);
    }
}
