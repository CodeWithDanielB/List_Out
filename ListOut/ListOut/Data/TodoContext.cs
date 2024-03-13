using ListOut.Models;
using Microsoft.EntityFrameworkCore;

namespace ListOut.Data
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options)
        : base(options)
        {
        }

        public DbSet<TodoItem> TodoItems { get; set; }
    }
}
