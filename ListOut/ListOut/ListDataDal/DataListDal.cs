using Dapper;
using ListOut.Data;

namespace ListOut.ListDataDal
{
    public class DataListDal
    {
        private readonly DapperContext _context;

        public DataListDal(DapperContext context)
        {
            _context = context;
        }
    }
}
